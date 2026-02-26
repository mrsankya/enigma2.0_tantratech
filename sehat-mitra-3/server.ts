import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import multer from "multer";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const db = new Database("sehatmitra.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS screenings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT,
    age INTEGER,
    gender TEXT,
    family_history TEXT,
    smoking_status TEXT,
    bmi REAL,
    wbc REAL,
    rbc REAL,
    hemoglobin REAL,
    tumor_marker REAL,
    risk_score INTEGER,
    risk_category TEXT,
    recommendations TEXT,
    image_analysis TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  const upload = multer({ storage: multer.memoryStorage() });

  // API Routes
  app.post("/api/screen", upload.single('image'), async (req, res) => {
    try {
      const { 
        patientName, age, gender, familyHistory, smokingStatus, 
        bmi, wbc, rbc, hemoglobin, tumorMarker 
      } = req.body;
      
      const imageFile = req.file;

      // Call Gemini for Risk Assessment
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        As an AI medical assistant, analyze the following patient data for early cancer risk detection.
        
        Patient Data:
        - Age: ${age}
        - Gender: ${gender}
        - Family History of Cancer: ${familyHistory}
        - Smoking Status: ${smokingStatus}
        - BMI: ${bmi}
        - Blood Biomarkers:
          - WBC: ${wbc}
          - RBC: ${rbc}
          - Hemoglobin: ${hemoglobin}
          - Tumor Marker Level: ${tumorMarker}
        
        ${imageFile ? 'A medical image has also been provided for analysis.' : 'No medical image provided.'}

        Provide a risk assessment in JSON format with the following fields:
        - risk_score: (0-100)
        - risk_category: (Low, Moderate, High)
        - recommendations: (A string of medical recommendations)
        - consultation_doctor: (The specific type of specialist to consult, e.g., "Oncologist", "Hematologist", "General Physician")
        - image_analysis: (Brief analysis of the provided image if applicable, otherwise "N/A")
        - feature_importance: (An object with keys like "Age", "Biomarkers", "History" and values 0-1 representing their weight in this specific prediction)

        Be conservative and professional. This is for screening purposes only.
      `;

      let parts: any[] = [{ text: prompt }];
      if (imageFile) {
        parts.push({
          inlineData: {
            data: imageFile.buffer.toString('base64'),
            mimeType: imageFile.mimetype
          }
        });
      }

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts },
        config: {
          responseMimeType: "application/json"
        }
      });

      const assessment = JSON.parse(result.text || "{}");

      // Save to DB
      const stmt = db.prepare(`
        INSERT INTO screenings (
          patient_name, age, gender, family_history, smoking_status, 
          bmi, wbc, rbc, hemoglobin, tumor_marker, 
          risk_score, risk_category, recommendations, image_analysis
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const info = stmt.run(
        patientName || "Anonymous", age, gender, familyHistory, smokingStatus,
        bmi, wbc, rbc, hemoglobin, tumorMarker,
        assessment.risk_score, assessment.risk_category, 
        assessment.recommendations, assessment.image_analysis
      );

      res.json({ ...assessment, id: info.lastInsertRowid });
    } catch (error) {
      console.error("Screening error:", error);
      res.status(500).json({ error: "Failed to process screening" });
    }
  });

  app.get("/api/patients", (req, res) => {
    const patients = db.prepare("SELECT * FROM screenings ORDER BY created_at DESC").all();
    res.json(patients);
  });

  app.get("/api/trends", (req, res) => {
    const trends = db.prepare(`
      SELECT date(created_at) as date, AVG(risk_score) as avg_risk, COUNT(*) as count 
      FROM screenings 
      GROUP BY date(created_at) 
      ORDER BY date ASC
    `).all();
    res.json(trends);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
