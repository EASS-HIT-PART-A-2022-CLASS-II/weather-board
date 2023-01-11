import {Card, Checkbox, FormControlLabel} from "@mui/material";
import {useEffect, useState} from "react";


function Cities(props) {

    const [cities, setAllCities] = useState([]);

    async function fetchCities() {
        const response = await fetch('http://localhost:8000/citiesInIsrael');
        const data = await response.json();
        return data
    };

    useEffect((data) => {
        fetchCities().then((data) => {
            setAllCities(data);
        });
    }, []);


    const [state, setState] = useState(
        Object.fromEntries(cities.map((city) => {
            return [city, false]
        }))
    );

    useEffect(() => {
        setState(
            Object.fromEntries(cities.map((city) => {
                return [city, props.currentCities?.filter((c) => c === city).length > 0 || false]
            }))
        )
    }, [props.currentCities, cities])

    const getObjKey = (obj, value) => {
        return Object.keys(obj).filter(key => obj[key] === value);
    }

    const handleChange = (event) => {
        if (props.currentCities.length < 12 || !event.target.checked) {
            const newState = {
                ...state,
                [event.target.name]: event.target.checked,
            }
            setState(newState);
            props.setCities(getObjKey(newState, true).map((cityName) => {
                return cities.find((city) => city === cityName)
            }));
        }
    };

    const citiesItems = cities.map((city) =>
        <FormControlLabel
            key={city}
            control={<Checkbox checked={state[city] ? state[city] : false} onChange={handleChange}
                               name={city}/>}
            {...{label: city}}
        />);

    return (
        <Card style={{padding: '20px', marginTop:"5px",  height: "fit-content", width: '120px', marginLeft: "15px"}}>
            <h2 style={{display: 'flex', marginTop: "2px"}}>Cities</h2>
            <div className="cities" style={{display: 'flex', flexDirection: 'column'}}>{citiesItems}</div>
        </Card>
    );
}


export default Cities;