# Weather-board
Get weather for all cities in israel

## How to run the app
## Pre-requisites

Make sure you have docker installed on your machine

## Instructions for the backend and database 
1. Open Terminal inside a desired folder and run the following command:
   ```
   git clone https://github.com/EASS-HIT-PART-A-2022-CLASS-II/weather-board.git
   ```
   
2. Then go inside the weather-board folder:
   ```
   cd backend
   ```
   
3. Start by pulling the image for the MongoDB:
   ```
   docker pull mongo
   ```
   
4. and now you can running the backend with db:
   ```
   docker run -d -p 27017:27017 --name test-mongo mongo:latest
   ```
