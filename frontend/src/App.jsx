import './App.css'
import Boards from "./components/boards/Boards";
import {useState, useEffect} from "react";
import Board from "./components/Board/Board.jsx";

function App() {
    const [boards, setBoards] = useState([]);

    async function fetchBoards() {
        const response = await fetch('http://localhost:8000/boards');
        const data = await response.json();
        return data.data;
    };

    useEffect(() => {
         fetchBoards().then((data) => {
             if(data !== 'Error') {
                 setBoards(data)
             }else {
                 setBoards([])
             }
         })
    }, []);

    const [currentBoard, setCurrentBoard] = useState({});

    const setBoard = async(board) => {
        let newBoards = boards.map((b) => {
            if (b.id === board.id) {
                return board;
            }
            return b;
        });
        const requestOptions = {
            method: 'PUT',
            headers:  { 'Content-Type': 'application/json' },
            body: JSON.stringify(board)
        };
        await fetch('http://localhost:8000/board/'+board.id, requestOptions);
        setBoards(newBoards);
    }

    return (
      <div style={{justifyContent: 'flex-end', display:'flex', width: "100vw", height:"100vh"}}>
          <div style={{marginRight: '20px', display:'flex', flexDirection:'row'}}>
              {Boards}
              {/*<TestComp/>*/}
              <Board board={boards ? boards.find((board) => board.id === currentBoard) : {}} setBoard={setBoard}/>
              <Boards boards={boards} currentBoard={currentBoard} setCurrentBoard={(value)=> setCurrentBoard(value)} setBoards={setBoards}/>
          </div>
      </div>
  )
}

export default App
