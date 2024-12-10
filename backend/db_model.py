from pydantic import BaseModel, Field
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI, HTTPException
from .database import db  # Assuming you have the database connection setup
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError

# MongoDB collection reference
account_collection = db.Account  # Replace 'accounts' with your actual collection name
schedule_collection = db.schedules # Replace 'schedules' with your

class ScheduleModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    schedule_name : str
# Pydantic model for Account
class AccountModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    code: str
    name: str
    phone: str
    city: str
    credit: float
    debit: float
    schedule_name : str
    
    # class Config:
    #     # Use MongoDB's ObjectId as the id (automatically handled by MongoDB)
    #     arbitrary_types_allowed = True

# CRUD Operations
# Insert an account into the database
async def create_account(account: AccountModel):
    account_data = account.dict(by_alias=True)  # Use aliases (e.g., "_id")
    account_data.pop("_id", None)
   
    print("Data to insert:", account_data) 
    try:
        result = await account_collection.insert_one(account_data)

        # Create the response object with the newly inserted id
        created_account_data = account.dict()  # Start with the original account data
        created_account_data["id"] = str(result.inserted_id)  # Add the inserted id
        return AccountModel(**created_account_data)  # Construct the AccountModel
    except Exception as e:
        print(f"Error inserting document: {e}")
        raise HTTPException(status_code=500, detail="Failed to create account")
    


# Get all accounts from the database
async def get_accounts():
    try:
        # Attempt to fetch accounts from the database
        # print("Fetching accounts from MongoDB...")  # Add logging
        accounts_cursor = account_collection.find()  # You can add projection here to limit fields
        accounts = await accounts_cursor.to_list(length=100)  # Use await on to_list()

        print(f"Accounts fetched: {accounts}")  # Add logging to inspect the fetched data

        # If accounts are returned, convert them to the required format
        accounts_cleaned = [{**account, "_id": str(account["_id"])} for account in accounts]
        return accounts_cleaned
    except Exception as e:
        print(f"Error fetching accounts: {e}")  # Log the specific error
        raise HTTPException(status_code=500, detail="Failed to fetch accounts")

async def delete_account_by_id(id: str) -> bool:
    try:
        # Convert string ID to ObjectId
        object_id = ObjectId(id)

        # Delete the document with the matching _id
        result = await account_collection.delete_one({"_id": object_id})
        return result.deleted_count > 0  # Returns True if a document was deleted
    except PyMongoError as e:
        print(f"Error deleting account: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete account")

async def delete_schedule_by_id(id: str) -> bool:
    try:
        # Convert string ID to ObjectId
        object_id = ObjectId(id)

        # Delete the document with the matching _id
        result = await schedule_collection.delete_one({"_id": object_id})
        return result.deleted_count > 0  # Returns True if a document was deleted
    except PyMongoError as e:
        print(f"Error deleting account: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete account")    


async def get_schedules():
    try:
        # Attempt to fetch schedules from the database
        # print("Fetching schedules from MongoDB...")  # Add logging
        schedules_cursor = db.schedules.find()  # You can add projection here to limit fields
        schedules = await schedules_cursor.to_list(length=100)  # Use await on to_list()

          # Add logging to inspect the fetched data
        
        # If schedules are returned, convert them to the required format
        schedules_cleaned = [{"s_no": idx + 1, **schedule, "_id": str(schedule["_id"])} for idx, schedule in enumerate(schedules)]
        print(f"Schedules fetched: {schedules_cleaned}")
        return schedules_cleaned
    except Exception as e:
        print(f"Error fetching schedules: {e}")  # Log the specific error
        raise HTTPException(status_code=500, detail="Failed to fetch schedules")

async def create_schedule(schedule: ScheduleModel):
    
    schedule_data = schedule.dict(by_alias=True)  # Use aliases (e.g., "_id")
    schedule_data.pop("_id", None)
   
    print("Data to insert:", schedule_data) 
    try:
        result = await schedule_collection.insert_one(schedule_data)

        # Create the response object with the newly inserted id
        created_schedule_data = schedule.dict()  # Start with the original account data
        created_schedule_data["id"] = str(result.inserted_id)  # Add the inserted id
        return ScheduleModel(**created_schedule_data)  # Construct the AccountModel
    except Exception as e:
        print(f"Error inserting document: {e}")
        raise HTTPException(status_code=500, detail="Failed to create account")   