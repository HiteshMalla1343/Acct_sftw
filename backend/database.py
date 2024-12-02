from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.pool import NullPool

# PostgreSQL Async Configuration
DATABASE_URL = "postgresql+asyncpg://pybackend:root@localhost:5432/acc_software"

# Create base for declarative models
Base = declarative_base()

# Create async engine
engine = create_async_engine(
    DATABASE_URL, 
    echo=True,  # Set to False in production
    poolclass=NullPool  # Recommended for async operations
)

# Create async session factory
AsyncSessionLocal = sessionmaker(
    engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

# Create tables function
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# Dependency to get database session
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session