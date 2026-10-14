import { useState, useEffect } from 'react'

function App() {
  const [elo, setElo] = useState(2347)
  const [animatedElo, setAnimatedElo] = useState(0)
  const [winRate] = useState(67.3)
  const [matches] = useState(1842)
  const [kills] = useState(12847)
  const [kd] = useState(1.84)

  useEffect(() => {
    const target = elo
    const duration = 2000
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedElo(Math.floor(eased * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [elo])

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white font-sans relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ff5500] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#ff5500] opacity-3 rounded-full blur-3xl" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,85,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,85,0,0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2 bg-[#2d2d44] px-4 py-2 rounded-full border border-[#3d3d5c]">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">ONLINE</span>
          </div>
        </div>

        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#ff5500] to-[#ff8800] p-1">
              <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                <span className="text-4xl font-bold text-[#ff5500]">H</span>
              </div>
            </div>
            {/* Level badge */}
            <div className="absolute -bottom-2 -right-2 bg-[#ff5500] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-3 border-[#1a1a2e] shadow-lg shadow-[#ff5500]/30">
              9
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-1 tracking-tight">
            <span className="text-[#ff5500]">h1nixx</span>
          </h1>
          <p className="text-gray-400 text-sm">Competitive Player • Micro Mobility Legend</p>
        </div>

        {/* FACEIT Level Card */}
        <div className="bg-[#2d2d44]/80 backdrop-blur-sm rounded-xl border border-[#3d3d5c] p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ff5500]/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#ff5500]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">FACEIT Level</p>
                <p className="text-2xl font-bold text-white">Level 9</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-wider">ELO Rating</p>
              <p className="text-2xl font-bold text-[#ff5500]">{animatedElo.toLocaleString()}</p>
            </div>
          </div>
          
          {/* ELO Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>2000</span>
              <span>2500</span>
            </div>
            <div className="h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#ff5500] to-[#ff8800] rounded-full transition-all duration-2000 ease-out"
                style={{ width: `${((elo - 2000) / 500) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#2d2d44]/80 backdrop-blur-sm rounded-xl border border-[#3d3d5c] p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Win Rate</p>
            <p className="text-xl font-bold text-green-400">{winRate}%</p>
          </div>
          <div className="bg-[#2d2d44]/80 backdrop-blur-sm rounded-xl border border-[#3d3d5c] p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Matches</p>
            <p className="text-xl font-bold text-white">{matches.toLocaleString()}</p>
          </div>
          <div className="bg-[#2d2d44]/80 backdrop-blur-sm rounded-xl border border-[#3d3d5c] p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Kills</p>
            <p className="text-xl font-bold text-[#ff5500]">{kills.toLocaleString()}</p>
          </div>
          <div className="bg-[#2d2d44]/80 backdrop-blur-sm rounded-xl border border-[#3d3d5c] p-4 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">K/D Ratio</p>
            <p className="text-xl font-bold text-white">{kd}</p>
          </div>
        </div>

        {/* Achievement Card */}
        <div className="bg-gradient-to-r from-[#ff5500]/20 to-[#ff8800]/10 backdrop-blur-sm rounded-xl border border-[#ff5500]/30 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#ff5500]/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🛴</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#ff5500] text-white text-xs font-bold px-2 py-0.5 rounded">TOP-1</span>
                <span className="text-yellow-400 text-xs">🏆</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Топ-1 стантер на Kugoo Wish 04 Pro</h3>
              <p className="text-gray-400 text-sm">Непревзойдённый мастер электросамокатов. Стоит на одной ноге дольше, чем ты живёшь. Баланс — это не навык, это состояние души.</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-[#2d2d44]/80 backdrop-blur-sm rounded-xl border border-[#3d3d5c] p-6 mb-6">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="text-[#ff5500]">⚡</span> О себе
          </h3>
          <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
            <p>🎮 CS2 — мой дом. 9 лвл FACEIT — это не случайность, это тысячи часов в aim trainer и бесконечные клатчи 1v4.</p>
            <p>🛴 Когда не в игре — я на Kugoo Wish 04 Pro. Топ-1 стантер мира. Да, это реальная дисциплина. Нет, ты не сможешь повторить.</p>
            <p>💀 Мой девиз: "Если не можешь зарешать — стань на одну ногу и медитируй."</p>
            <p>🔥 Стримлю каждый день. Заходи — будет жарко.</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#2d2d44]/80 backdrop-blur-sm rounded-xl border border-[#3d3d5c] p-6 mb-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-[#ff5500]">🔗</span> Соцсети
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <a href="#" className="flex items-center gap-3 bg-[#1a1a2e] hover:bg-[#1a1a2e]/80 border border-[#3d3d5c] hover:border-[#ff5500]/50 rounded-lg p-3 transition-all duration-200 group">
              <div className="w-8 h-8 bg-[#5865F2] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Discord</span>
            </a>
            <a href="#" className="flex items-center gap-3 bg-[#1a1a2e] hover:bg-[#1a1a2e]/80 border border-[#3d3d5c] hover:border-[#ff5500]/50 rounded-lg p-3 transition-all duration-200 group">
              <div className="w-8 h-8 bg-[#0088cc] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Telegram</span>
            </a>
            <a href="#" className="flex items-center gap-3 bg-[#1a1a2e] hover:bg-[#1a1a2e]/80 border border-[#3d3d5c] hover:border-[#ff5500]/50 rounded-lg p-3 transition-all duration-200 group">
              <div className="w-8 h-8 bg-[#ff0000] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">YouTube</span>
            </a>
            <a href="#" className="flex items-center gap-3 bg-[#1a1a2e] hover:bg-[#1a1a2e]/80 border border-[#3d3d5c] hover:border-[#ff5500]/50 rounded-lg p-3 transition-all duration-200 group">
              <div className="w-8 h-8 bg-[#ff5500] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">FACEIT</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-gray-600 text-xs">
            © 2024 h1nixx • Powered by pure skill & Kugoo Wish 04 Pro
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
