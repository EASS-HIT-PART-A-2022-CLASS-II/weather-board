# Weather-board
Get weather for all cities in israel

## How to run the app
## Pre-requisites

Make sure you have docker installed on your machine

## Instructions
1. Open Terminal inside a desired folder and run the following command:

   git clone https://github.com/EASS-HIT-PART-A-2022-CLASS-II/weather-board.git
   
2. Then go inside the notes-app folder:

   cd backend
   
3. building an image:

   docker build -t myimage .
   
4. and now you can running the project:

   docker run -ti -p 8000:8000 myimage
