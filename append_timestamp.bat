@echo off
REM Define the path to the text file
set FILE_PATH=C:\repo-skill-maps\skill-maps.com\time.txt
set LOG_FILE=C:\repo-skill-maps\skill-maps.com\log.txt


REM Print debugging information to the log file
echo Running script at %date% %time% >> "%LOG_FILE%"
if exist "%FILE_PATH%" (
    echo File exists >> "%LOG_FILE%"
) else (
    echo File does not exist >> "%LOG_FILE%"
)

REM Get the current date and time
for /f "tokens=1-4 delims=/ " %%a in ("%date% %time%") do (
    set "current_date=%%c-%%a-%%b"
    set "current_time=%%d"
)

REM Format time to HH:MM:SS
set "current_time=%current_time:~0,2%:%current_time:~3,2%:%current_time:~6,2%"

REM Remove any extra colons or periods (handling potential formatting issues)
set "current_time=%current_time:.=%"

REM Append the timestamp to the file
echo Last modified on: %current_date% %current_time% >> "%FILE_PATH%"

REM Log completion
echo Timestamp appended successfully >> "%LOG_FILE%"
