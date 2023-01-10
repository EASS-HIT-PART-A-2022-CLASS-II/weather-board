import Cities from "../cities/Cities.jsx";
import {useEffect, useState} from "react";
import {Button, Card, CardContent, Typography} from "@mui/material";

function Board(props) {
    const [cities, setCities] = useState([]);
    const [currentWeatherByCity, setCurrentWeatherByCity] = useState({})

    useEffect(() => {
        props.setBoard({
            ...props.board,
            cities: cities
        });
    }, [cities]);

    const getWeather = async() => {
        const requestOptions = {
            method: 'POST',
            headers:  { 'Content-Type': 'application/json' },
            body: JSON.stringify(props.board.cities.map((city) => city))
        };
        const response = await fetch('http://localhost:8000/citiesWeather', requestOptions);
        console.log(currentWeatherByCity[props.board.cities[0]]?.main.temp)

        setCurrentWeatherByCity(await response.json())
    }

    return (
        <Card style={{marginRight: "20px", display: "flex", padding:"10px", height:"900px"}}>
            {props.board?.id ?
                <div>
                 <Button style={{marginLeft: "30px"}} onClick={getWeather}>Get Weather</Button>
                 <Cities currentCities={props.board.cities} cities={cities} setCities={setCities}/>
                </div>
                : <div>
                    Choose Board
                </div>
            }

            <div style={{display: "flex", flexDirection:"row", flexWrap:"wrap", width:"1050px" }}>
                {
                    props.board?.cities.map((city, index) => (
                    <div style={{
                        margin: "20px",
                        width: '300px',
                        height: '250px',
                        lineHeight: '250px',
                        textAlign: 'center',
                        borderWidth: "2px",
                        borderStyle: "solid"
                    }} key={index}>
                        <Card sx={{maxWidth: 545}} style={{height: '250px'}}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {city}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                   Current Temp: {currentWeatherByCity[city]?.main.temp}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Min Temp: {currentWeatherByCity[city]?.main.temp_min}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Max Temp: {currentWeatherByCity[city]?.main.temp_max}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </Card>
    );
}

export default Board