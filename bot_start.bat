@echo off

call %~dp0venv\Scripts\activate

cd %~dp0

set TOKEN=5732497729:AAFOVh9Dio6FDp8T5cUu3lHY6irga_--Yqw

python tg_bot.py

pause