from fastapi import APIRouter
from typing import List
from .db_model import AccountModel, create_account, get_accounts,ScheduleModel , get_schedules, delete_account_by_id,delete_schedule_by_id,create_schedule,ProductModel,get_products,create_product,delete_product_by_id, StockModel,create_stock,get_stocks,delete_stock_by_id,delete_stocks_by_ids,stock_collection
from fastapi import FastAPI, HTTPException,Body
from bson.errors import InvalidId
from pydantic import BaseModel, Field ,validator   
from bson.objectid import ObjectId
from pymongo.errors import PyMongoError
router = APIRouter()

@router.get("/")
def read_root():
    print("read_root")
    return {"message": "Hello World"}

# POST endpoint to create a new account
@router.post("/accounts", response_model=AccountModel)
async def add_account(account: AccountModel):
    print(account)
    account_id = await create_account(account)
    account.id = account_id  # Attach the generated account ID to the response
    return account


# GET endpoint to fetch all accounts


# @router.get("/accounts", response_model=List[AccountModel])
# async def get_accounts():
#     return accounts_db  # Return the list of accounts
@router.get("/accounts", response_model=List[AccountModel])
async def fetch_accounts():
    accounts = await get_accounts()
    return accounts

@router.delete("/accounts/{id}")
async def delete_account(id: str):
    try:
        result = await delete_account_by_id(id)
        if result:
            return {"message": f"Account with _id {id} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail=f"Account with _id {id} not found")
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid _id format")

@router.post("/schedules", response_model=ScheduleModel)
async def add_schedule(account: ScheduleModel):
    print(account)
    account_id = await create_schedule(account)
    account.id = account_id  # Attach the generated account ID to the response
    return account    
@router.delete("/schedules/{id}")
async def delete_schedule(id: str):
    try:
        result = await delete_schedule_by_id(id)
        if result:
            return {"message": f"Schedule with _id {id} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail=f"Schedule with _id {id} not found")
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid _id format")  
      

@router.get("/schedules")
async def fetch_schedules():
    schedules = await get_schedules()
    print(schedules)
    return schedules



@router.post("/products", response_model=ProductModel)
async def add_product(product: ProductModel):
    print(product)
    account_id = await create_product(product)
    product.id = account_id  # Attach the generated account ID to the response
    return product  

@router.get("/products")
async def fetch_products():
    schedules = await get_products()
    print(schedules)
    return schedules

@router.delete("/products/{id}")
async def delete_product(id: str):
    try:
        result = await delete_product_by_id(id)
        if result:
            return {"message": f"Schedule with _id {id} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail=f"Schedule with _id {id} not found")
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid _id format")  

# Add Stock-related routes
@router.post("/stocks", response_model=StockModel)
async def add_stock(stock: StockModel):
    print(stock)
    stock_id = await create_stock(stock)
    stock.id = stock_id
    return stock

@router.get("/stocks")
async def fetch_stocks():
    stocks = await get_stocks()
    print(stocks)
    return stocks

@router.delete("/stocks/bulk-delete")
async def delete_multiple_stocks(ids: list[str]):
    stock_ids = ids
    print("Received stock IDs:")
    print(stock_ids)
    try:
        result = await delete_stocks_by_ids(stock_ids)
        if result:
            return {"message": f"{len(stock_ids)} stocks deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="No stocks found to delete")
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid _id format")

@router.put("/stocks/{stock_id}")
async def update_stock(stock_id: str, stock_update: StockModel):
    """
    Updates an existing stock based on the stock ID.
    """
    print(f"Received update request for stock ID: {stock_id} with data: {stock_update.dict(exclude_unset=True)}")

    try:
        # Convert stock_id to ObjectId
        try:
            object_id = ObjectId(stock_id)
        except Exception as e:
            print(f"Invalid stock ID: {stock_id}")
            raise HTTPException(status_code=400, detail="Invalid stock ID format")

        # Exclude unset fields from the update payload
        update_data = stock_update.dict(exclude_unset=True, by_alias=True)
        if "_id" in update_data:
            del update_data["_id"]  # Ensure _id is not updated

        # Ensure there is at least one field to update
        if not update_data:
            raise HTTPException(status_code=400, detail="No fields provided for update")

        # Log the update data
        print(f"Update data: {update_data}")

        # Perform the update operation
        result = await stock_collection.update_one(
            {"_id": object_id}, 
            {"$set": update_data}
        )

        # Check the result of the update operation
        if result.matched_count == 0:
            print(f"No stock found with ID: {stock_id}")
            raise HTTPException(status_code=404, detail="Stock not found")
        
        print(f"Stock updated successfully: {stock_id}")
        return {"message": "Stock updated successfully", "updated_fields": update_data}

    except PyMongoError as e:
        print(f"Database error occurred while updating stock: {e}")
        raise HTTPException(status_code=500, detail="Failed to update stock")
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")



