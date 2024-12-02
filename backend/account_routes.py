from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from .database import get_db
from .db_model import Account, Schedule 
from .schemas import AccountCreate
from .utils.translation import translate_to_telugu

router = APIRouter()

@router.post("/create_account")
async def create_account(account: AccountCreate, db: Session = Depends(get_db)):
    try:
        # Check if schedule exists
        schedule = await db.execute(
            select(Schedule).where(Schedule.id == account.schedule_id)
        )
        if not schedule.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="Invalid schedule")

        # Translate name to Telugu
        telugu_name = translate_to_telugu(account.name)

        # Create new account
        new_account = Account(
            code=account.code,
            name=account.name,
            phone=account.phone,
            city=account.city,
            credit=account.credit,
            debit=account.debit,
            telugu_name=telugu_name,
            schedule_id=account.schedule_id
        )

        db.add(new_account)
        await db.commit()
        return {"message": "Account created successfully"}

    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=400, detail="Duplicate code or name")
    except ValueError as ve:
        await db.rollback()
        raise HTTPException(status_code=400, detail=str(ve))

@router.get("/schedules")
async def get_schedules(db: Session = Depends(get_db)):
    result = await db.execute(select(Schedule))
    schedules = result.scalars().all()
    return [{"id": s.id, "name": s.schedule_name} for s in schedules]

from sqlalchemy.orm import selectinload

@router.get("/customers")
async def get_customers(db: Session = Depends(get_db)):
    try:
        result = await db.execute(select(Account).options(selectinload(Account.schedule)))
        customers = result.scalars().all()

        return [
            {
                "code": customer.code,
                "accountName": customer.name,
                "town": customer.city,
                "schedule": customer.schedule.schedule_name if customer.schedule else "No Schedule",  # Safe check for None
                "teluguName": customer.telugu_name,
            }
            for customer in customers
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching customers: {str(e)}")

@router.delete("/customers/{code}")
async def delete_customer(code: str, db: Session = Depends(get_db)):
    customer = await db.execute(select(Account).where(Account.code == code))
    customer = customer.scalar_one_or_none()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    await db.delete(customer)
    await db.commit()
    return {"message": "Customer deleted successfully"}

@router.put("/customers/{code}")
async def update_customer(code: str, customer_data: AccountCreate, db: Session = Depends(get_db)):
    customer = await db.execute(select(Account).where(Account.code == code))
    customer = customer.scalar_one_or_none()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    customer.name = customer_data.name
    customer.city = customer_data.city
    customer.telugu_name = customer_data.telugu_name
    customer.schedule_id = customer_data.schedule_id

    await db.commit()
    return {"message": "Customer updated successfully"}




