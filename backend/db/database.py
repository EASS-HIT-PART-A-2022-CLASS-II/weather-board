import pymongo

# Connect to the MongoDB instance
client = pymongo.MongoClient("mongodb://localhost:27017")

database = client["weather"]

collection = database["weather_app"]