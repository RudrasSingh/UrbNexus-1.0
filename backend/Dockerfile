# Use latest Python Alpine image
FROM python:3.12-alpine

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies required for psycopg2 & Flask
RUN apk add --no-cache \
    gcc musl-dev libffi-dev openssl-dev python3-dev postgresql-dev

# Copy the requirements file first (for caching)
COPY ../requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend application
COPY backend/ .

# Copy the .env file into the container (but ignore it in Git)
COPY .env .env

# Expose port 5000 for Flask
EXPOSE 5000

# Set environment variables for Flask (Optional)
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Run the Flask app
CMD ["python", "app.py"]
