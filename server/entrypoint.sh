#!/bin/sh

echo "Running migrations..."

python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput

exec "$@"