import { useEffect, useState } from 'react'

const ScoreBoard = () => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem('xox-deluxe-scores')) || []
    setHistory(scores)
  }, [])

  return (
    <div className="bg-white p-4 rounded mt-4 shadow-md">
      <h3 className="font-bold mb-2">Geçmiş Oyunlar</h3>
      <ul className="space-y-1 text-sm text-gray-700">
        {history.map((entry, i) => (
          <li key={i}>
            {entry.player1} vs {entry.player2} → <span className="font-semibold">Kazanan:</span> {entry.winner}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ScoreBoard
