from pydantic import BaseModel

class Board(BaseModel):
    name: str
    cities: list = []


def ResponseMessage(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
    }


def ErrorMessage(data, message):
    return {
        "data": data,
        "code": 404,
        "message": message,
    }
