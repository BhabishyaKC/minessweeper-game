'use client'
import React, { useEffect, useState } from 'react'

const Minessweeper = () => {
    const [mineGrid, setMineGrid] = useState([
        [
          {"item": 0, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 2, "displayed": false},
          {"item": 1, "displayed": false},
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
          {"item": 2, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 5, "displayed": false},
          {"item": "3", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": "", "displayed": false}
        ],
        [
          {"item": "💣", "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
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
          {"item": 2, "displayed": false}
        ],
        [
          {"item": "💣", "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 2, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false}
        ],
        [
          {"item": "💣", "displayed": false},
          {"item": 2, "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 2, "displayed": false},
          {"item": 4, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 3, "displayed": false}
        ],
        [
          {"item": "", "displayed": false},
          {"item": "", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 4, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 3, "displayed": false}
        ],
        [
          {"item": "", "displayed": false},
          {"item": 5, "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": 4, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 3, "displayed": false}
        ],
        [
          {"item": "2", "displayed": false},
          {"item": "", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": 2, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 2, "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false}
        ],
        [
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false},
          {"item": 3, "displayed": false},
          {"item": "", "displayed": false},
          {"item": 1, "displayed": false},
          {"item": 1, "displayed": false},
          {"item": "", "displayed": false},
          {"item": "💣", "displayed": false}
        ]
      ])
      const [timer, setTimer] = useState(60);
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
  <div className=" main-contaner flex items-center justify-center min-h-screen bg-gray-300">
    <div className="bg-gray-700 border-[3px] border-gray-600 rounded-lg p-4 shadow-2xl">
  
      <div className="flex justify-between items-center bg-gray-200 rounded-md px-4 py-2 mb-4 border border-gray-500">
        <p className="text-lg font-semibold text-gray-800"> 🕒 Seconds left: {timer}</p>
        <p className="text-lg font-semibold text-gray-800"> 🏆 Score: {score}</p>
      </div>

      
      {gameOver && (
        <p className="text-center text-xl text-red-500 font-semibold mb-5">💣 Game Over!!! You clicked on a mine!</p>
      )}

     
      <div className="flex flex-col space-y-[2px]">
        {mineGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-[3px] justify-center">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                onClick={() => handleMineClick(rowIndex, colIndex)}
                className={`h-10 w-10 border border-gray-500 rounded-sm text-center flex items-center justify-center font-bold text-sm text-red shadow-sm cursor-pointer transition
                  ${cell.displayed ? 'bg-[#E0E0D1]' : ' bg-[#C0C0C0]'}
                  ${cell.item === '💣' && cell.displayed ?''  : ''}
                  `}
              >
                {cell.displayed ? cell.item : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
)
   
    
  
}

export default Minessweeper