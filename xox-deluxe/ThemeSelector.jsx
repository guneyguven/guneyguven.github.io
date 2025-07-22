import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const themes = ['deluxe', 'retro', 'neon']

const ThemeSelector = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div className="flex space-x-4 mt-4">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-4 py-2 rounded text-white font-medium transition-colors duration-300 ${
            theme === t ? 'bg-black' : 'bg-gray-400'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

export default ThemeSelector
