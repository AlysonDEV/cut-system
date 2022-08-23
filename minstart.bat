@echo off

setlocal EnableDelayedExpansion

REM Check if node is installed
for /f "delims=" %%i in ('node -v') do set output=%%i

IF "!output!" EQU "" (
  echo node could not be found
  call "C:\Program Files\nodejs\nodevars.bat"
  npm run start
) else (
  npm run start
)



