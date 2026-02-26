@echo off
SETLOCAL
echo ===================================================
echo Sehat Mitra - AI Early Cancer Detection System
echo ===================================================
echo.

echo [1/3] Checking environment configuration...
if not exist .env (
    echo WARNING: .env file not found.
    echo Creating .env from .env.example...
    copy .env.example .env
    echo Please update the .env file with your GEMINI_API_KEY.
) else (
    echo .env file found.
)

echo.
echo [2/3] Installing npm dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to install dependencies. 
    echo Please ensure Node.js and npm are installed on your system.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/3] Starting the development server...
echo.
echo ---------------------------------------------------
echo Application will be available at: http://localhost:3000
echo ---------------------------------------------------
echo.

call npm run dev

pause
