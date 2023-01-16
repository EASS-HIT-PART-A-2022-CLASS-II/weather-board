# Weather-board
Get weather for all cities in israel

## How to run the app
## Pre-requisites

Make sure you have docker installed on your machine

## Instructions for the backend and database 
1. Open Terminal inside a desired folder and run the following command:
   ```
   https://github.com/EASS-HIT-PART-A-2022-CLASS-II/weather-board.git
   ```
   
2. Then go inside the weather-board folder:
   ```
   cd backend
   ```
   
3. Start by pulling the image for the MongoDB:
   ```
   docker pull mongo
   ```
4. And now you can running the backend with db:
   ```
   docker run -d -p 27017:27017 --name test-mongo mongo:latest
   ```
5. The backend and db are running, now open your browser and write:
   ```
   http://localhost:8000/
   ```
## Instructions for the backend and database 
1. Open Terminal inside a desired folder and run the following command:
   ```
   https://github.com/EASS-HIT-PART-A-2022-CLASS-II/weather-board.git
   ```
2. Then go inside the weather-board folder:
   ```
   cd frontend
   ```
3. Build an image:
   ```
   docker build -t myimage .
   ```
4. 
    
 

   
