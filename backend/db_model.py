from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Schedule(Base):
    __tablename__ = 'schedules'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    schedule_name = Column(String, nullable=False, unique=True)
    
    # Relationship with accounts
    accounts = relationship("Account", back_populates="schedule", cascade="all, delete")

class Account(Base):
    __tablename__ = 'accounts'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String, nullable=False, unique=True)
    name = Column(String, nullable=False, unique=True)
    phone = Column(String, nullable=True)
    city = Column(String, nullable=True)
    credit = Column(Integer, default=0, nullable=False)
    debit = Column(Integer, default=0, nullable=False)
    telugu_name = Column(String, nullable=True)
    
    # Foreign key relationship with Schedule
    schedule_id = Column(Integer, ForeignKey('schedules.id'), nullable=False)
    schedule = relationship("Schedule", back_populates="accounts")