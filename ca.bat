@echo off
call "aura\Scripts\activate"
python manage.py runserver 127.0.0.1:4174 --noreload
