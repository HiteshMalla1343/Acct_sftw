import motor.motor_asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient

client = AsyncIOMotorClient(
    "mongodb+srv://Hitesh:hitesh.13@cluster0.hopn4.mongodb.net/SVC?retryWrites=true&w=majority",
    tls=True,  # Ensure TLS is enabled
    tlsAllowInvalidCertificates=True  # Use this only if testing locally
)

# Access the database
db = client.SVC  # Replace with your database name



