from fastapi import APIRouter
from typing import List
from .db_model import AccountModel, create_account, get_accounts,ScheduleModel , get_schedules, delete_account_by_id,delete_schedule_by_id,create_schedule,ProductModel,get_products,create_product,delete_product_by_id
from fastapi import FastAPI, HTTPException
from bson.errors import InvalidId

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


