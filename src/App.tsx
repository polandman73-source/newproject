import { useState, useEffect, useRef } from 'react'

function App() {
  const [elo] = useState(2347)
  const [animatedElo, setAnimatedElo] = useState(0)
  const [winRate] = useState(67.3)
  const [matches] = useState(1842)
  const [kills] = useState(12847)
  const [kd] = useState(1.84)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#0a0a0f] text-white font-sans relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="fixed inset-0">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl transition-all duration-700 ease-out"
          style={{ 
            background: 'radial-gradient(circle, #ff5500, transparent)',
            left: mousePos.x - 250,
            top: mousePos.y - 250,
          }}
        />
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-[#ff5500] opacity-[0.04] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#ff5500] opacity-[0.03] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
      }} />

      {/* Noise texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className={`relative z-10 max-w-xl mx-auto px-4 py-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Top status bar */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
            </div>
            <span className="text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">Online</span>
          </div>
          <div className="text-xs text-gray-600 font-mono">2026</div>
        </div>

        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-5">
            {/* Outer ring */}
            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-[#ff5500] via-[#ff8800] to-[#ff5500] opacity-80 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-[#ff5500] via-[#ff8800] to-[#ff5500] blur-md opacity-40" />
            
            {/* Avatar */}
            <div className="relative w-28 h-28 rounded-full bg-[#0a0a0f] flex items-center justify-center border-2 border-[#1a1a2e]">
              <div className="text-center">
                <span className="text-3xl font-black text-[#ff5500] tracking-tighter">H</span>
              </div>
            </div>
            
            {/* Level badge */}
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-[#ff5500] to-[#cc4400] text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 border-[#0a0a0f] shadow-lg shadow-[#ff5500]/40">
              9
            </div>
          </div>
          
          <h1 className="text-3xl font-black tracking-tight mb-1">
            <span className="bg-gradient-to-r from-[#ff5500] to-[#ff8800] bg-clip-text text-transparent">h1nixx</span>
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-medium">Competitive Player</p>
        </div>

        {/* FACEIT Level Card */}
        <div className="relative group mb-5">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff5500]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-[#12121a]/90 backdrop-blur-xl rounded-2xl border border-[#1f1f2e] p-5 hover:border-[#ff5500]/30 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff5500]/20 to-[#ff5500]/5 rounded-xl flex items-center justify-center border border-[#ff5500]/20">
                  <svg className="w-5 h-5 text-[#ff5500]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">FACEIT Level</p>
                  <p className="text-xl font-bold text-white">Level 9</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">ELO</p>
                <p className="text-xl font-bold text-[#ff5500] font-mono">{animatedElo.toLocaleString()}</p>
              </div>
            </div>
            
            {/* ELO Progress bar */}
            <div className="relative">
              <div className="flex justify-between text-[10px] text-gray-600 mb-1.5 font-mono">
                <span>2000</span>
                <span>2500</span>
              </div>
              <div className="h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#ff5500] to-[#ff8800] rounded-full relative"
                  style={{ width: `${((elo - 2000) / 500) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-lg shadow-[#ff5500]/50 border-2 border-[#ff5500]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: 'Win Rate', value: `${winRate}%`, color: 'text-green-400', icon: '📈' },
            { label: 'Matches', value: matches.toLocaleString(), color: 'text-white', icon: '🎮' },
            { label: 'Kills', value: kills.toLocaleString(), color: 'text-[#ff5500]', icon: '💀' },
            { label: 'K/D', value: kd.toString(), color: 'text-blue-400', icon: '⚔️' },
          ].map((stat, i) => (
            <div 
              key={stat.label}
              className="group relative bg-[#12121a]/90 backdrop-blur-xl rounded-2xl border border-[#1f1f2e] p-4 hover:border-[#ff5500]/20 transition-all duration-500"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.15em]">{stat.label}</p>
                <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">{stat.icon}</span>
              </div>
              <p className={`text-xl font-bold ${stat.color} font-mono`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Achievement Card */}
        <div className="relative group mb-5">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-[#12121a]/90 backdrop-blur-xl rounded-2xl border border-yellow-500/20 p-5 hover:border-yellow-500/40 transition-all duration-500">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-2xl flex items-center justify-center border border-yellow-500/20">
                  <span className="text-2xl">🛴</span>
                </div>
                <div className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded-md">
                  #1
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">World Top 1</span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 leading-tight">Топ-1 стантер на Kugoo Wish 04 Pro</h3>
                <p className="text-gray-500 text-xs leading-relaxed">Непревзойдённый мастер электросамокатов. Стоит на одной ноге дольше, чем ты живёшь.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity / Fun Facts */}
        <div className="relative group mb-8">
          <div className="relative bg-[#12121a]/90 backdrop-blur-xl rounded-2xl border border-[#1f1f2e] p-5 hover:border-[#ff5500]/20 transition-all duration-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 bg-[#ff5500] rounded-full" />
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium">Highlights</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#ff5500]/10 rounded-lg flex items-center justify-center text-sm flex-shrink-0">🎯</div>
                <div>
                  <p className="text-sm text-white font-medium">Ace в клатче 1v5 на Mirage</p>
                  <p className="text-[10px] text-gray-500">FACEIT Premium • 2 часа назад</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500/10 rounded-lg flex items-center justify-center text-sm flex-shrink-0">🏆</div>
                <div>
                  <p className="text-sm text-white font-medium">Подтверждён статус Топ-1 стантера</p>
                  <p className="text-[10px] text-gray-500">Kugoo Championship • вчера</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center text-sm flex-shrink-0">🔥</div>
                <div>
                  <p className="text-sm text-white font-medium">10 побед подряд в пуге</p>
                  <p className="text-[10px] text-gray-500">FACEIT Hub • 3 дня назад</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-4">
          <div className="inline-flex items-center gap-2 bg-[#12121a]/50 px-4 py-2 rounded-full border border-[#1f1f2e]">
            <div className="w-1.5 h-1.5 bg-[#ff5500] rounded-full" />
            <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">h1nixx © 2026</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
