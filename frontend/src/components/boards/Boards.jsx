import {Button, Checkbox, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useEffect} from "react";
import {Delete} from "@mui/icons-material";

function Boards(props) {
    const handleChange = (event) => {
        props.setCurrentBoard(event.target.value);
    };

    async function fetchNewBoard(id) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'New Board', cities: [] })
        };
        const response = await fetch('http://localhost:8000/board', requestOptions);
        const data = await response.json();
        props.setBoards([...props.boards, data.data[0]]);
    }

    async function fetchDeleteBoard() {
        const response = await fetch('http://localhost:8000/board/' + props.currentBoard, {
            method: "DELETE",
        });
        const data = await response.json();
        props.setBoards([...props.boards.filter((b) => b.id !== data.data)])
    }

    const boardsItems = props.boards?.map((board) =>
        <FormControlLabel
            key={board.id}
            value={board.id}
            control={<Radio />}
            {...{label: board.name}}
        />);

    return (
        <div style={{width:"200px"}}>
            <h2 style={{display: 'flex'}}>Boards</h2>
            <div style={{display: "flex", flexDirection:"row"}}>
                <Button style={{margin: "10px"}} variant="contained" endIcon={<AddIcon />} onClick={fetchNewBoard}>
                    Add
                </Button>
                <Button style={{margin: "10px"}} variant="contained" endIcon={<AddIcon />} onClick={fetchDeleteBoard}>

                </Button>
            </div>
            <RadioGroup name="controlled-radio-buttons-group"
                        value={props.currentBoard}
                        onChange={handleChange}
                        style={{display: 'flex', flexDirection: 'column' }}>
                {boardsItems}
            </RadioGroup>
        </div>
    );
}

export default Boards;