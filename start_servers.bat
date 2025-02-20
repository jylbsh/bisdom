@echo off

echo Starting backend server...
start cmd /c "cd C:\work\bisdom\backend && python main.py"

echo Starting frontend server...
start cmd /c "cd C:\work\bisdom\frontend && npm start"

echo All servers started.
pause