@echo off
REM filepath: c:\Users\Admin\Desktop\portfolio\run.bat
title Portfolio Server
color 0A

echo ================================================
echo     DANIEL POLEDNIK - PORTFOLIO SERVER
echo ================================================
echo.

REM Kontrola, zda je Node.js nainstalovany
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js neni nainstalovany!
    echo Stahnete si Node.js z: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Kontrola, zda je npm dostupny
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] NPM neni dostupny!
    echo.
    pause
    exit /b 1
)

echo [INFO] Spoustim lokalni server...
echo [INFO] Port: 8000
echo [INFO] URL: http://localhost:8000
echo.
echo [TIP] Pro zastaveni serveru stisknete Ctrl+C
echo ================================================
echo.

REM Spusteni serveru s fallback moznostmi
npx http-server -p 8000 -o --cors
if %errorlevel% neq 0 (
    echo.
    echo [WARNING] http-server se nepodarilo spustit, zkousim Python...
    
    REM Zkusime Python 3
    python -c "import http.server" >nul 2>&1
    if %errorlevel% equ 0 (
        echo [INFO] Spoustim Python 3 server...
        python -m http.server 8000
    ) else (
        REM Zkusime Python 2
        python -c "import SimpleHTTPServer" >nul 2>&1
        if %errorlevel% equ 0 (
            echo [INFO] Spoustim Python 2 server...
            python -m SimpleHTTPServer 8000
        ) else (
            echo [ERROR] Zadny server neni dostupny!
            echo Nainstalujte Node.js nebo Python.
            pause
            exit /b 1
        )
    )
)

echo.
echo [INFO] Server byl ukoncen.
pause