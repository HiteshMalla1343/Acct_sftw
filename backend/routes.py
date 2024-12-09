from fastapi import APIRouter
from typing import List
from .db_model import AccountModel, create_account, get_accounts,ScheduleModel , get_schedules
from fastapi import FastAPI, HTTPException

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


@router.get("/schedules",response_model=List[ScheduleModel])
async def fetch_schedules():
    schedules = await get_schedules()
    return schedules




