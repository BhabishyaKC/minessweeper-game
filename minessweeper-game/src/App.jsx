
import React, { useEffect, useState } from 'react'

const Mine = () => {
    const [mineGrid, setMineGrid] = useState([
        [
          {"item": "0", "displayed": false},
          {"item": "1", "displayed": false},
          {"item": "2", "displayed": false},
          {"item": "1", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "1", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false}
        ],
        [
          {"item": "💣", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false}
        ],
        [
          {"item": "💣", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 2, "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false}
        ],
        [
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 3, "displayed": false}
        ],
        [
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 3, "displayed": false}
        ],
        [
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 3, "displayed": false}
        ],
        [
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 3, "displayed": false}
        ],
        [
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 3, "displayed": false}
        ],
        [
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 3, "displayed": false}
        ],
        [
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 3, "displayed": false}
        ]
      ])
      const [timer, setTimer] = useState(10);
      useEffect(()=>{
        if(timer > 0){
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        }
      },[timer])

      const [score,setScore] = useState(0);
      const [gameOver, setGameOver] = useState(false)
      const handleMineClick = (row ,col)=> {
      
        if(gameOver) return;
        const newGrid = [...mineGrid];
        newGrid[row][col].displayed = true;
        if(newGrid[row][col].item !== '💣' && newGrid[row][col].item !== ''){
            setScore(Number(score) + Number(newGrid[row][col].item))
        } else if(newGrid[row][col].item === '💣'){
            setGameOver(true)
        }
        setMineGrid(newGrid);
      }


  return (
    <div>
        <p>Seconds left: {timer}</p>
        <p>Score: {score}</p>
        {gameOver && <p className='text-red-600'>Game Over! You clicked on a mine!</p>}
        {mineGrid.map((item,id)=>{
                return(
                    <div className='flex' key={id}>
                        {item.map((val, idx)=>{
                            return (
                                <div key={idx} onClick={()=>handleMineClick(id,idx)} className={` p-3 h-10 w-10 border border-black ${val.displayed ? 'bg-yellow-300' : 'bg-white'}`}>
                                    {val.displayed? val.item : ''}
                                    </div>
                            )
                        })}
                        </div>
                )
        })}
    </div>
  )
}

export default Mine