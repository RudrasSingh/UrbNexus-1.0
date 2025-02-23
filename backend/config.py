import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    OAUTH2_CLIENT_ID = os.getenv("OAUTH2_CLIENT_ID")
    OAUTH2_CLIENT_SECRET = os.getenv("OAUTH2_CLIENT_SECRET")
    OAUTH2_META_URL = os.getenv("OAUTH2_META_URL")
    FLASK_SECRET = os.getenv("FLASK_SECRET")
    FLASK_PORT = 5000
    YOUTUBE_API = os.getenv("apiKeyYoutube")
    FIREBASE_CONFIG = {
        'apiKey': os.getenv("API_KEY"),
        'authDomain': os.getenv("AUTH_DOMAIN"),
        'projectId': os.getenv("PROJECT_ID"),
        'storageBucket': os.getenv("STORAGE_BUCKET"),
        'messagingSenderId': os.getenv("MESSAGING_SENDER_ID"),
        'appId': os.getenv("APP_ID"),
        'measurementId': os.getenv("MEASUREMENT_ID"),
        'databaseURL': os.getenv(""),
    }
    GEN_AI_API = os.getenv("API_KEY_GENAI")
    MAILJET_API_KEY = os.getenv("API_KEY_MAILJET")
    MAILJET_API_SECRET = os.getenv("API_SECRET_MAILJET")