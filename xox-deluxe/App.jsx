import { ThemeProvider } from './context/ThemeContext'
import GameBoard from './components/GameBoard'
import PlayerCard from './components/PlayerCard'
import ThemeSelector from './components/ThemeSelector'
import DarkModeToggle from './components/DarkModeToggle'
import ScoreBoard from './components/ScoreBoard'
import { useState } from 'react'

function App() {
  const [scoreData, setScoreData] = useState([])

  const handleGameEnd = (winner) => {
    const newEntry = {
      player1: 'Sen',      // İleride dinamik yaparsak input alınabilir
      player2: 'Ben',
      winner,
    }
    const updatedScores = [...scoreData, newEntry]
    setScoreData(updatedScores)
    localStorage.setItem('xox-deluxe-scores', JSON.stringify(updatedScores))
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen p-6 bg-gray-100 text-gray-900">
        <DarkModeToggle />
        <ThemeSelector />
        <div className="flex justify-between items-center mt-4">
          <PlayerCard name="Sen" avatar="/avatars/user1.png" score={scoreData.filter(s => s.winner === 'X').length} />
          <PlayerCard name="Ben" avatar="/avatars/user2.png" score={scoreData.filter(s => s.winner === 'O').length} />
        </div>
        <GameBoard onGameEnd={handleGameEnd} />
        <ScoreBoard />
      </div>
    </ThemeProvider>
  )
}

export default App
