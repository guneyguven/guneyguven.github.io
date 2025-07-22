import { useState, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const GameBoard = ({ onGameEnd }) => {
  const { theme } = useContext(ThemeContext)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const handleClick = (index) => {
    if (board[index]) return
    const newBoard = [...board]
    newBoard[index] = xIsNext ? 'X' : 'O'
    setBoard(newBoard)
    setXIsNext(!xIsNext)

    const winner = calculateWinner(newBoard)
    if (winner) onGameEnd(winner)
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ]
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  return (
    <div className={`grid grid-cols-3 gap-2 p-4 bg-${theme} transition-colors duration-500`}>
      {board.map((value, i) => (
        <div
          key={i}
          onClick={() => handleClick(i)}
          className={`w-24 h-24 flex items-center justify-center text-4xl font-bold rounded shadow-md cursor-pointer transition transform duration-300 ease-in-out ${
            value === 'X' ? 'text-red-500 scale-110' : value === 'O' ? 'text-blue-500 scale-110' : 'bg-white'
          }`}
        >
          {value}
        </div>
      ))}
    </div>
  )
}

export default GameBoard
