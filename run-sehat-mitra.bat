@echo off
echo ===================================================
echo Sehat Mitra 2.0 - Local Setup and Execution
echo ===================================================
echo.
echo [1/2] Installing required libraries...
call npm install
echo.
echo [2/2] Starting the development server on http://localhost:7878 ...
call npm run dev -- --port 7878 --host
pause
