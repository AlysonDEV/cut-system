@echo off

setlocal EnableDelayedExpansion

REM Check if node is installed
for /f "delims=" %%i in ('node -v') do set output=%%i
cls

IF "!output!" EQU "" (
  echo node could not be found
  call "C:\Aincrad\node\nodevars.bat"
  npm run start
node -v
pause
) else (
  npm run start
)




