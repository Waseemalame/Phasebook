#!/bin/bash
source venv/bin/activate
exec gunicorn --bind :$PORT --worker-class eventlet -w 1 app:app
