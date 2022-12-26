from typing import List
import requests
import json
from fastapi import FastAPI
from allcities import cities
from db.database import collection
from schemas.boards_schema import boards_helper
from bson import ObjectId
from models.board_model import Board, ResponseMessage, ErrorMessage

app = FastAPI()


@app.get('/')
async def root():
    return {"message": "Welcome to my weather-app"}


@app.post('/citiesWeather')
async def get_weather(selectedCities: List[str]):
    weatherData = {}
    apiKey = "ac4aae3f3e3d1d7725d091b2ca8e47d6"
    for city in selectedCities:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}"
        response = requests.get(url)
        json_data = json.loads(response.text)
        weatherData[city] = json_data
    return weatherData


@app.get('/citiesInIsrael')
async def get_cities():
    return {city.name for city in cities.filter(country_code='IL')}


@app.get('/boards')
async def get_all_boards():
    boards = boards_helper(collection.find())
    if boards:
        return ResponseMessage(boards, "Boards found successfully")
    else:
        return ErrorMessage("Error", "couldn't find the boards")



@app.get("/board/{id}")
async def get_board(id: str):
    board = collection.find({"_id": ObjectId(id)})
    if board:
        return ResponseMessage(boards_helper(board), "Board found successfully")
    else:
        return ErrorMessage("Error", "couldn't find the board with id: {}".format(id))


@app.post('/board')
async def add_board(board: Board):
    new_board_id = collection.insert_one(dict(board))
    if new_board_id:
        return ResponseMessage(boards_helper(collection.find({"_id": new_board_id.inserted_id})), "New Board created successfully")
    else:
        return ErrorMessage("Error", "couldn't create a new board")



@app.put("/board/{id}")
async def update_board(id: str, board: Board):
    collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(board)})
    updated_board = collection.find({"_id": ObjectId(id)})
    if updated_board:
        return ResponseMessage(boards_helper(updated_board), "The board has been updated successfully")
    else:
        return ErrorMessage("Error", "couldn't update the board with id: {}".format(id))


@app.delete("/board/{id}")
async def delete_board(id: str):
    board = collection.find({"_id": ObjectId(id)})
    deleted_board = collection.find_one_and_delete({"_id": ObjectId(id)})
    if deleted_board:
        return ResponseMessage("Board with id: {} deleted successfully".format(id), "deleted successfully")
    else:
        return ErrorMessage("Error", "couldn't delete the with id: {}".format(id))
