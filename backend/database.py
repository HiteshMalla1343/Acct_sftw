import motor.motor_asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
import os

mongo_uri = os.getenv("MONGO_URI")
client = AsyncIOMotorClient(
    mongo_uri=mongo_uri,
    tls=True,  # Ensure TLS is enabled
    tlsAllowInvalidCertificates=True  # Use this only if testing locally
)

# Access the database
db = client.SVC  # Replace with your database name



