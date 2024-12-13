from pydantic import BaseModel, Field ,validator    
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI, HTTPException
from .database import db  # Assuming you have the database connection setup
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError
from fastapi import Body

# MongoDB collection reference
account_collection = db.Account  # Replace 'accounts' with your actual collection name
schedule_collection = db.schedules # Replace 'schedules' with your
product_collection = db.products # Replace 'products' with your
stock_collection = db.stocks # Replace 'stocks' with your

class ScheduleModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    schedule_name : str
    
class ProductModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    product_name : str    
# Pydantic model for Account
class AccountModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    code: str 
    name: str
    phone: Optional[str] = None
    city: Optional[str] = None
    credit: Optional[float] = 0.0
    debit: Optional[float] = 0.0
    schedule_name : str


class StockModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    date: Optional[str] = None
    stockNo: str = Field(..., description="Stock Number")
    village: Optional[str] = Field(..., description="Village/City")
    vehicle: Optional[str] = Field(..., description="Vehicle")
    bags: int = Field(..., description="Number of Bags")
    product: Optional[str] = None
    kirai: Optional[float] = None
    type: Optional[str] = Field(default="Commission", description="Stock Type")
    exp: Optional[float] = None
    stockClear: Optional[bool] = False

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: str
        }
    

async def validate_unique_account(account: AccountModel):
    """
    Validate that the account code and name are unique in the database
    """
    # Check for existing account with the same code
    existing_account_code = await account_collection.find_one({"code": account.code})
    if existing_account_code:
        raise HTTPException(
            status_code=400, detail="An account with this code already exists"
        )

    # Check for existing account with the same name
    existing_account_name = await account_collection.find_one({"name": account.name})
    if existing_account_name:
        raise HTTPException(
            status_code=400, detail="An account with this name already exists"
        )


async def create_account(account: AccountModel):
    """
    Insert an account into the database
    """
    account_data = account.dict(by_alias=True)  # Use aliases (e.g., "_id")
    account_data.pop("_id", None)

    print("Data to insert:", account_data)
    try:
        # Validate unique account
        await validate_unique_account(account)

        # Insert into the database
        result = await account_collection.insert_one(account_data)

        # Create the response object with the newly inserted id
        created_account_data = account.dict()  # Start with the original account data
        created_account_data["id"] = str(result.inserted_id)  # Add the inserted id
        return AccountModel(**created_account_data)  # Construct the AccountModel

    except HTTPException as http_exc:
        # Log the specific error
        print(f"Validation error: {http_exc.detail}")
        raise http_exc  # Re-raise the HTTPException to retain its message

    except Exception as e:
        # Handle other exceptions and log them
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
    
async def delete_product_by_id(id: str) -> bool:
    try:
        # Convert string ID to ObjectId
        object_id = ObjectId(id)

        # Delete the document with the matching _id
        result = await product_collection.delete_one({"_id": object_id})
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


async def create_product(product: ProductModel):
    
    product_data = product.dict(by_alias=True)  # Use aliases (e.g., "_id")
    product_data.pop("_id", None)
   
    print("Data to insert:", product_data) 
    try:
        result = await product_collection.insert_one(product_data)

        created_product_data = product.dict()  # Start with the original account data
        created_product_data["id"] = str(result.inserted_id)  # Add the inserted id
        return ProductModel(**created_product_data)  # Construct the AccountModel
    except Exception as e:
        print(f"Error inserting document: {e}")
        raise HTTPException(status_code=500, detail="Failed to create account")   
        
async def get_products():
    try:
        products_cursor = product_collection.find()  # You can add projection here to limit fields
        products = await products_cursor.to_list(length=100)  # Use await on to_list()

        products_cleaned = [{"s_no": idx + 1, **item, "_id": str(item["_id"])} for idx, item in enumerate(products)]
        print(f"Products fetched: {products_cleaned}")
        return products_cleaned
    except Exception as e:
        print(f"Error fetching schedules: {e}")  # Log the specific error
        raise HTTPException(status_code=500, detail="Failed to fetch schedules")    

# Async function to create a stock entry
async def create_stock(stock: StockModel):
    stock_data = stock.dict(by_alias=True)  # Use aliases (e.g., "_id")
    stock_data.pop("_id", None)  # Remove the 'id' field if it exists to let MongoDB generate a new ID
    
    try:
        result = await stock_collection.insert_one(stock_data)
        
        # Reconstruct the stock data with the newly generated ID
        created_stock_data = stock.dict()  # Start with the original stock data
        created_stock_data["id"] = str(result.inserted_id)  # Add the inserted ID
        return StockModel(**created_stock_data)  # Construct the StockModel
    except Exception as e:
        print(f"Error inserting stock document: {e}")
        raise HTTPException(status_code=500, detail="Failed to create stock")

# Async function to get all stocks
async def get_stocks():
    try:
        # Attempt to fetch stocks from the database
        # print("Fetching stocks from MongoDB...")  # Add logging
        stocks_cursor = stock_collection.find()  # Optionally add projection
        stocks = await stocks_cursor.to_list(length=1000)  # Limit to 1000 stocks
        
        print(f"Stocks fetched: {stocks}")  # Add logging to inspect the fetched data

        # Convert the stocks to the required format using the StockModel
        stocks_cleaned = [{**stock, "_id": str(stock["_id"])} for stock in stocks]
        return stocks_cleaned
    except Exception as e:
        print(f"Error fetching stocks: {e}")  # Log the specific error
        raise HTTPException(status_code=500, detail="Failed to fetch stocks")

# Async function to delete a single stock by ID
async def delete_stock_by_id(stock_id: str):
    
    result = await stock_collection.delete_one({"_id": ObjectId(stock_id)})
    return result.deleted_count > 0

# Async function to delete multiple stocks by IDs
async def delete_stocks_by_ids(stock_ids: list[str]) -> bool:
    print("Starting bulk delete process")
    try:
        # Ensure stock_ids is not empty
        if not stock_ids:
            print("No stock IDs provided for deletion")
            raise HTTPException(status_code=400, detail="No stock IDs provided")

        # Convert string IDs to ObjectId
        try:
            object_ids = [ObjectId(stock_id) for stock_id in stock_ids]
        except Exception as e:
            print(f"Invalid stock IDs provided: {stock_ids}")
            raise HTTPException(status_code=400, detail="Invalid stock ID format")

        # Log the converted ObjectIds
        print(f"Deleting stocks with IDs: {object_ids}")

        # Delete all documents with matching _ids
        result = await stock_collection.delete_many({"_id": {"$in": object_ids}})
        
        # Log the number of documents deleted
        print(f"Number of stocks deleted: {result.deleted_count}")

        # Return success only if at least one document was deleted
        if result.deleted_count == 0:
            print("No matching stocks found for deletion")
            raise HTTPException(status_code=404, detail="No matching stocks found")

        return True
    except PyMongoError as e:
        print(f"Database error occurred while deleting stocks: {e}")  # Log the specific error
        raise HTTPException(status_code=500, detail="Failed to delete stocks")
    except Exception as e:
        print(f"Unexpected error: {e}")  # Catch any unexpected errors
        raise HTTPException(status_code=500, detail="An unexpected error occurred")
