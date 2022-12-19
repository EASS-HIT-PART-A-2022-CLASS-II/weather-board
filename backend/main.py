from typing import List
import requests
import json
import uvicorn
from fastapi import FastAPI
from allcities import cities

app = FastAPI()

@app.get('/')
async def read_route():
    return "Hello"


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
async def getCities():
    return {city.name for city in cities.filter(country_code='IL')}
