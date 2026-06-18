
import React from 'react'
import dilLogo from '../dil-logo.png'

interface HeaderProps {
  lang: 'en' | 'de'
  onLanguageChange: (lang: 'en' | 'de') => void
  onBack?: () => void
}

const Header: React.FC<HeaderProps> = ({ lang, onLanguageChange, onBack }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="text-[#004284] hover:text-[#003366] text-xl font-bold transition-colors"
          >
            ←
          </button>
        )}
        <div className="flex items-center gap-3">
          <img src={dilLogo} alt="Digital Impact Lab Logo" className="h-10 w-10 object-contain" />
          <h1 className="text-2xl font-bold text-[#004284]">Parkour Code</h1>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onLanguageChange('de')}
          className={`px-4 py-2 rounded-xl text-lg font-semibold transition-all hover:scale-105 ${lang === 'de' ? 'bg-[#004284] text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          🇩🇪
        </button>
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-4 py-2 rounded-xl text-lg font-semibold transition-all hover:scale-105 ${lang === 'en' ? 'bg-[#004284] text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          🇬🇧
        </button>
      </div>
    </header>
  )
}

export default Header

