import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext)

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="mt-2 mb-4 px-4 py-2 bg-gray-700 text-white rounded transition"
    >
      {darkMode ? 'Gündüz Modu' : 'Gece Modu'}
    </button>
  )
}

export default DarkModeToggle
