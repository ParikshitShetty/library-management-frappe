FROM python:3.10-slim

WORKDIR /app

# Copy the app app
COPY . /app

# Upgrade pip and setuptools
RUN pip install --upgrade pip setuptools
RUN pip install --no-cache-dir --upgrade -r requirements.txt

EXPOSE 8000

CMD ["fastapi", "run"]