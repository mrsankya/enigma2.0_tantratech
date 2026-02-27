# Sehat Mitra 2.0

**AI-powered Cancer Risk Stratification & Preventive Intelligence Platform for India**

---

## 📖 Overview
Sehat Mitra 2.0 is an AI-driven clinical decision support system designed for **early-stage cancer detection**.  
Unlike version 1.0 (general health information), this version specializes in **multimodal risk stratification** by combining:
- **Medical Imaging** (CT, MRI, X-ray)
- **Biomarkers** (e.g., CA-125, CEA)
- **Patient History** (lifestyle, genetics, habits)

The platform provides clinicians with **transparent, explainable insights** and helps prioritize patients for screening in resource-limited settings.

---

## ✨ Core Features
- **Risk Stratification Dashboard**  
  - Classifies patients into categories: *Low, Moderate, High, Urgent Screening Recommended*  
  - Displays a **Risk Gauge** with confidence and data completeness indicators  

- **Explainable AI (XAI)**  
  - "Why This Risk Level?" card showing risk factors with **Risk Points** (e.g., Smoking → +2 points)  
  - SHAP-based transparency for clinician trust  

- **Medical Disclaimer Layer**  
  - Prominent banner clarifying that Sehat Mitra provides AI-assisted insights, not medical diagnosis  

- **Multilingual Clinical Insights**  
  - Gemini-powered summaries in English/Hindi  
  - Dictionary-based i18n system for easy expansion to other languages  

- **Crisis Detection Protocol**  
  - Detects distress signals (e.g., “I want to die”)  
  - Provides empathetic support, helpline suggestions, and triggers UI’s empathetic mode  

- **Guided Screening Workflow**  
  - Secure intake of DICOM images, lab results, and patient history  
  - Real-time Firebase integration for HIPAA-compliant storage  

---

## 🛠️ Technical Stack
- **Frontend**: Next.js 15 (App Router), React 18, TypeScript  
- **Styling**: Tailwind CSS + ShadCN UI  
- **Backend/BaaS**: Firebase Auth, Firestore, Firebase Storage  
- **AI/ML Layer**:  
  - Google Genkit for orchestration  
  - Gemini 2.5 Flash for clinical text analysis  
  - Recharts for medical data visualization  

---

## 🚀 Roadmap
### Phase 2
- DICOM Viewer Integration (OHIF)  
- AI Image Segmentation (UNet/SegNet)  
- Referral Network for oncologists  
- Offline PWA Health Vault  

### Phase 3
- Genomic Data Integration (BRCA1/BRCA2)  
- Wearable Data Correlation (Google Fit/Apple Health)  
- Federated Learning for privacy-preserving model training  
- Predictive Population Mapping for government health planning  
- Blockchain-based audit trails for compliance  

---

## ⚖️ Compliance
Sehat Mitra 2.0 is designed to meet:
- **HIPAA (USA)**: Secure handling of Protected Health Information (PHI)  
- **GDPR (Europe)**: Data subject rights, privacy by design  
- **ABDM (India)**: National health data standards  

---

## 📌 Positioning
Sehat Mitra 2.0 is not a diagnostic tool.  
It is a **decision support system** that empowers clinicians with AI-assisted stratification, transparency, and preventive intelligence — especially in rural and underserved regions.

---

## 🧑‍💻 Contributors
- **Team Sehat Mitra** — Hackathon 2026  
- Built with ❤️ for healthcare innovation in India
