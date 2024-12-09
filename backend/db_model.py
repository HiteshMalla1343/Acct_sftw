from pydantic import BaseModel, Field
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI, HTTPException
from .database import db  # Assuming you have the database connection setup


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
        return [{key: value for key, value in account.items() if key != "_id"} for account in accounts]
    except Exception as e:
        print(f"Error fetching accounts: {e}")  # Log the specific error
        raise HTTPException(status_code=500, detail="Failed to fetch accounts")


async def get_schedules():
    try:
        # Attempt to fetch schedules from the database
        # print("Fetching schedules from MongoDB...")  # Add logging
        schedules_cursor = db.schedules.find({}, {"_id": 1, "schedule_name": 1})  # You can add projection here to limit fields
        schedules = await schedules_cursor.to_list(length=100)  # Use await on to_list()

        # print(f"Schedules fetched: {schedules}")  # Add logging to inspect the fetched data

        # If schedules are returned, convert them to the required format
        return [{"id": str(schedule["_id"]), "schedule_name": schedule["schedule_name"]} for schedule in schedules]
    except Exception as e:
        print(f"Error fetching schedules: {e}")  # Log the specific error
        raise HTTPException(status_code=500, detail="Failed to fetch schedules")
