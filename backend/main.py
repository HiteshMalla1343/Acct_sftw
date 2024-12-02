from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.database import create_tables, AsyncSessionLocal
from backend.db_model import Schedule
from sqlalchemy.future import select
from backend.account_routes import router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    await create_tables()
    
    # Populate schedules if not exist
    async with AsyncSessionLocal() as session:
        existing_schedules = await session.execute(select(Schedule))
        if not existing_schedules.scalars().first():
            default_schedules = [
                Schedule(schedule_name="MARKET INDIA BATCH"),
                Schedule(schedule_name="OPTION 2"),
                Schedule(schedule_name="OPTION 3")
            ]
            session.add_all(default_schedules)
            await session.commit()
    
    yield

app = FastAPI(lifespan=lifespan)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include router
app.include_router(router, prefix="/api")