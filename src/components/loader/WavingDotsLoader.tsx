import React from 'react'

const WavingDotsLoader: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="w-3 h-3 bg-white rounded-full animate-wave"
          style={{
            animation: `wave 1.5s ease-in-out infinite`,
            animationDelay: `${index * 0.15}s`
          }}
        />
      ))}
    </div>
  )
}

export default WavingDotsLoader