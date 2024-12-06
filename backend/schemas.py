from pydantic import BaseModel, Field, model_validator
from typing import Optional

class AccountCreate(BaseModel):
    code: str = Field(..., min_length=2)
    name: str = Field(..., min_length=2)
    phone: Optional[str] = None
    city: Optional[str] = None
    credit: int = Field(default=0, ge=0)
    debit: int = Field(default=0, ge=0)
    schedule_id: int

    @model_validator(mode="after")  # Validate after all fields are processed
    def validate_code_with_name(cls, values):
        print("Model Validator received:", values)  # Debugging
        if not values.code.startswith(values.name[0].upper() or values.name[0]):
            raise ValueError("Code must start with the first letter of the name.")
        if type(int(values.code[1:])) is not int :
            raise ValueError("Code must contain only integers after first letter.")
        return values