const PlayerCard = ({ name, avatar, score }) => {
  return (
    <div className="flex items-center space-x-4 animate-fade-in-up">
      <img src={avatar} alt="avatar" className="w-14 h-14 rounded-full shadow-lg" />
      <div>
        <h2 className="font-bold text-lg">{name}</h2>
        <p className="text-sm text-gray-500">Puan: {score}</p>
      </div>
    </div>
  )
}

export default PlayerCard
