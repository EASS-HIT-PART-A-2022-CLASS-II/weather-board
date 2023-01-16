import os

class environment:
    DEFAULT_DB_NAME: str = "weather"
    DB_NAME: str = os.getenv("db", DEFAULT_DB_NAME)
    DB_HOST: str = "mongodb://weather"
    DEFAULT_DB_PORT: int = 27017
    DB_PORT: int = int(os.getenv("db_port",DEFAULT_DB_PORT))

settings = environment()