import React, { useState, useMemo, useEffect, useRef } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

// --- TRANSLATIONS ---
const translations = {
  en: {
    appTitle: "Parkour Code",
    playNow: "Let's play!",
    pickMission: "Choose your mission!",
    eachMission: "Each mission teaches you something new!",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    waitActions: "All Actions",
    myProgram: "My Program",
    checkCode: "Check Code",
    mauziAide: "Mauzi's Help",
    waitingForYou: "Waiting for your actions...",
    parkourStart: "Start the parkour!",
    parkourRunning: "Parkour is running!",
    legosOnWay: "The Legos are on their way!",
    testUs: "Test for us",
    mauziSafe: "Mauzi is safe!",
    didIt: "You did it! You just learned how a program works!",
    again: "Play again",
    otherMission: "Another mission",
    missionStart: "Mission started! Let's go!",
    actionAdded: "Action added:",
    actionRemoved: "Action removed:",
    errorWrongPath: "Wrong path! Look for:",
    successParkourDone: "Parkour complete! Mauzi is safe!",
    removeWrongBlock: "👉 Tip: Remove the wrong block above!",
    oops: "Oops!",
    mission1Title: "Help Mauzi wake up!",
    mission1Story: "Mauzi is fast asleep. Pluto is approaching! Arrange the actions in the correct order to wake her up.",
    mission2Title: "Defend against Pluto!",
    mission2Story: "Mauzi is awake! Now she needs light and music to chase Pluto away!",
    mission3Title: "Security for Mauzi!",
    mission3Story: "Perfect! Now activate the shield so Pluto never comes back!",
    hint1a: "🐱 Zzz... Mauzi is still asleep! Tip: Start with 'Eyes Open'!",
    hint1b: "👀 Mauzi has her eyes open! Next, she needs to 'Stand Up'!",
    hint1c: "🧍 Wow, Mauzi is standing! Now she can 'Wave'!",
    hint2a: "🐱 Zzz... Mauzi is asleep! Start with 'Eyes Open'!",
    hint2b: "👀 Perfect! Now Mauzi needs to 'Stand Up'!",
    hint2c: "🧍 Great! Now turn the 'Light On'!",
    hint2d: "💡 Wow! Finally, turn on the 'Music' so Pluto hears it!",
    hint3a: "🐱 Zzz... First, 'Eyes Open'!",
    hint3b: "👀 Great! Next, 'Stand Up'!",
    hint3c: "🧍 Perfect! Now 'Wave'!",
    hint3d: "👋 Wow! Turn the 'Light On'!",
    hint3e: "💡 Perfect! Then, 'Music'!",
    hint3f: "🎵 Almost there! Finally, the 'Shield'!",
    eyesOpen: "Eyes Open",
    standUp: "Stand Up",
    wave: "Wave",
    lightOn: "Light On",
    music: "Music",
    shield: "Shield",
    buttonA: "Press the Yellow Button",
    buttonB: "Press the Blue Button",
    lichtschrankeA: "Go through the First Light Barrier",
    gewicht: "Put the Weight On",
    lichtschrankeB: "Go through the Second Light Barrier",
    licht: "Activate the Light",
    levelLabel: "Level",
    programPerfect: "Program perfect!",
    nowLegoCanGo: "Now the Legos can start and complete the parkour!",
    parkourMission: "Parkour Mission",
    theLegoAreOnWay: "The Legos are on their way!",
    youDidIt: "You did it! You just learned how a program works!",
  },
  de: {
    appTitle: "Parkour Code",
    playNow: "Spielen wir!",
    pickMission: "Wähle deine Mission!",
    eachMission: "Jede Mission lehrt dich etwas Neues!",
    easy: "Einfach",
    medium: "Mittel",
    hard: "Schwer",
    waitActions: "Alle Aktionen",
    myProgram: "Mein Programm",
    checkCode: "Code prüfen",
    mauziAide: "Mauzi's Hilfe",
    waitingForYou: "Warte auf deine Aktionen...",
    parkourStart: "Parcours starten!",
    parkourRunning: "Parcours läuft!",
    legosOnWay: "Die Legos sind unterwegs!",
    testUs: "Test für uns",
    mauziSafe: "Mauzi ist sicher!",
    didIt: "Du hast es geschafft! Du hast gerade gelernt, wie ein Programm funktioniert!",
    again: "Nochmal spielen",
    otherMission: "Andere Mission",
    missionStart: "Mission gestartet! Los geht's!",
    actionAdded: "Aktion hinzugefügt:",
    actionRemoved: "Aktion entfernt:",
    errorWrongPath: "Falscher Weg! Suche nach:",
    successParkourDone: "Parcours abgeschlossen! Mauzi ist sicher!",
    removeWrongBlock: "👉 Tipp: Entferne den falschen Block oben!",
    oops: "Oops!",
    mission1Title: "Hilf Mauzi aufzuwachen!",
    mission1Story: "Mauzi schläft tief. Pluto nähert sich! Bringe die Aktionen in die richtige Reihenfolge, um sie zu wecken.",
    mission2Title: "Wehre Pluto ab!",
    mission2Story: "Mauzi ist wach! Jetzt braucht sie Licht und Musik, um Pluto zu vertreiben.",
    mission3Title: "Sicherheit für Mauzi!",
    mission3Story: "Perfekt! Jetzt aktiviert den Schutzschild, damit Pluto nie mehr zurückkommt!",
    hint1a: "🐱 Zzz... Mauzi schläft noch! Tipp: Fange mit 'Augen auf' an!",
    hint1b: "👀 Mauzi hat die Augen offen! Als Nächstes braucht sie 'Aufstehen'!",
    hint1c: "🧍 Wow, Mauzi steht! Jetzt kann sie 'Winken'!",
    hint2a: "🐱 Zzz... Mauzi schläft! Fange mit 'Augen auf' an!",
    hint2b: "👀 Perfekt! Jetzt braucht Mauzi 'Aufstehen'!",
    hint2c: "🧍 Super! Mach doch mal 'Licht an'!",
    hint2d: "💡 Wow! Abschließend kommt 'Musik', damit Pluto hört!",
    hint3a: "🐱 Zzz... Erst mal 'Augen auf'!",
    hint3b: "👀 Toll! Als Nächstes 'Aufstehen'!",
    hint3c: "🧍 Super! Jetzt 'Winken'!",
    hint3d: "👋 Wow! Mach 'Licht an'!",
    hint3e: "💡 Perfekt! Dann 'Musik'!",
    hint3f: "🎵 Fast fertig! Zuletzt 'Schutzschild'!",
    eyesOpen: "Augen auf",
    standUp: "Aufstehen",
    wave: "Winken",
    lightOn: "Licht an",
    music: "Musik",
    shield: "Schutzschild",
    buttonA: "Drücke den gelben Knopf",
    buttonB: "Drücke den blauen Knopf",
    lichtschrankeA: "Fahre durch die erste Lichtschranke",
    gewicht: "Stelle das Gewicht drauf",
    lichtschrankeB: "Fahre durch die zweite Lichtschranke",
    licht: "Aktiviere das Licht",
    levelLabel: "Level",
    programPerfect: "Programm perfekt!",
    nowLegoCanGo: "Jetzt können die Lego loslegen und den Parcours absolvieren!",
    parkourMission: "Mission des Parcours",
    theLegoAreOnWay: "Die Lego sind unterwegs!",
    youDidIt: "Du hast es geschafft! Du hast gerade gelernt, wie ein Programm funktioniert!",
  }
}

function getMissionData(lang: 'en' | 'de') {
  const t = translations[lang]
  return [
    {
      id: "aufwecken-einfach",
      level: "easy",
      title: t.mission1Title,
      story: t.mission1Story,
      blocks: [
        { id: "augen-auf", label: t.eyesOpen, icon: "👀", color: "bg-pink-300" },
        { id: "aufstehen", label: t.standUp, icon: "🧍", color: "bg-blue-300" },
        { id: "winken", label: t.wave, icon: "👋", color: "bg-green-300" },
      ],
      correctSequence: ["augen-auf", "aufstehen", "winken"],
      hints: {
        "augen-auf": t.hint1a,
        "aufstehen": t.hint1b,
        "winken": t.hint1c,
      },
      hardwareMission: [
        { id: "button-a", label: t.buttonA, sensor: "button-a" },
        { id: "lichtschranke-a", label: t.lichtschrankeA, sensor: "lichtschranke-a" },
      ],
    },
    {
      id: "verteidigung-mittel",
      level: "mid",
      title: t.mission2Title,
      story: t.mission2Story,
      blocks: [
        { id: "augen-auf", label: t.eyesOpen, icon: "👀", color: "bg-pink-300" },
        { id: "aufstehen", label: t.standUp, icon: "🧍", color: "bg-blue-300" },
        { id: "licht-an", label: t.lightOn, icon: "💡", color: "bg-yellow-300" },
        { id: "musik", label: t.music, icon: "🎵", color: "bg-purple-300" },
      ],
      correctSequence: ["augen-auf", "aufstehen", "licht-an", "musik"],
      hints: {
        "augen-auf": t.hint2a,
        "aufstehen": t.hint2b,
        "licht-an": t.hint2c,
        "musik": t.hint2d,
      },
      hardwareMission: [
        { id: "button-a", label: t.buttonA, sensor: "button-a" },
        { id: "button-b", label: t.buttonB, sensor: "button-b" },
        { id: "gewicht", label: t.gewicht, sensor: "gewicht" },
      ],
    },
    {
      id: "sicherheit-schwer",
      level: "hard",
      title: t.mission3Title,
      story: t.mission3Story,
      blocks: [
        { id: "augen-auf", label: t.eyesOpen, icon: "👀", color: "bg-pink-300" },
        { id: "aufstehen", label: t.standUp, icon: "🧍", color: "bg-blue-300" },
        { id: "winken", label: t.wave, icon: "👋", color: "bg-green-300" },
        { id: "licht-an", label: t.lightOn, icon: "💡", color: "bg-yellow-300" },
        { id: "musik", label: t.music, icon: "🎵", color: "bg-purple-300" },
        { id: "schutz", label: t.shield, icon: "🛡️", color: "bg-red-300" },
      ],
      correctSequence: ["augen-auf", "aufstehen", "winken", "licht-an", "musik", "schutz"],
      hints: {
        "augen-auf": t.hint3a,
        "aufstehen": t.hint3b,
        "winken": t.hint3c,
        "licht-an": t.hint3d,
        "musik": t.hint3e,
        "schutz": t.hint3f,
      },
      hardwareMission: [
        { id: "button-a", label: t.buttonA, sensor: "button-a" },
        { id: "button-b", label: t.buttonB, sensor: "button-b" },
        { id: "lichtschranke-a", label: t.lichtschrankeA, sensor: "lichtschranke-a" },
        { id: "gewicht", label: t.gewicht, sensor: "gewicht" },
        { id: "lichtschranke-b", label: t.lichtschrankeB, sensor: "lichtschranke-b" },
        { id: "licht", label: t.licht, sensor: "licht" },
      ],
    },
  ]
}

// --- TYPES ---
type Phase = 
  | "welcome" 
  | "level-select" 
  | "code-builder" 
  | "hardware-ready" 
  | "hardware-running" 
  | "success"

type Block = { id: string; label: string; icon: string; color: string }
type HardwareStep = { id: string; label: string; sensor: string; status: "pending" | "active" | "success" }
type ConsoleLine = { text: string; color: string; time: string }

// --- COMPONENTS ---
const Welcome = ({ onStart, t, onLanguageChange, lang }: { 
  onStart: () => void; 
  t: any; 
  onLanguageChange: (l: 'en' | 'de') => void;
  lang: 'en' | 'de'
}) => (
  <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-indigo-900">
    <div className="max-w-4xl w-full text-center">
      <div className="flex justify-center gap-12 mb-10">
        <div className="text-9xl animate-bounce" style={{ animationDuration: "3s" }}>🐱</div>
        <div className="text-9xl animate-pulse" style={{ animationDuration: "2s" }}>🐕</div>
      </div>
      <h1 className="text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        {t.appTitle}
      </h1>
      <p className="text-2xl text-slate-300 mb-10 max-w-2xl mx-auto">
        {lang === "de" 
          ? "Lerne Programmieren, indem du Mauzi vor Pluto schützt!" 
          : "Learn to code by protecting Mauzi from Pluto!"}
      </p>
      
      <div className="flex gap-4 justify-center mb-10">
        <button 
          onClick={() => onLanguageChange('de')} 
          className={`px-4 py-2 rounded-xl text-lg font-semibold transition-all hover:scale-105 ${lang === 'de' ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300'}`}
        >
          🇩🇪 Deutsch
        </button>
        <button 
          onClick={() => onLanguageChange('en')} 
          className={`px-4 py-2 rounded-xl text-lg font-semibold transition-all hover:scale-105 ${lang === 'en' ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300'}`}
        >
          🇬🇧 English
        </button>
      </div>

      <button onClick={onStart} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-16 py-6 rounded-3xl text-3xl font-extrabold shadow-2xl hover:scale-105 transition-all">
        {t.playNow}
      </button>
    </div>
  </div>
)

const LevelSelect = ({ onSelect, t, onLanguageChange, lang }: { 
  onSelect: (id: string) => void; 
  t: any;
  onLanguageChange: (l: 'en' | 'de') => void;
  lang: 'en' | 'de'
}) => (
  <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-indigo-900">
    <div className="max-w-6xl w-full">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => { /* Back to welcome could be added */ }} className="text-slate-400 hover:text-white text-2xl"></button>
        <h2 className="text-5xl font-extrabold text-white">{t.pickMission}</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => onLanguageChange('de')} 
            className={`px-4 py-2 rounded-xl text-lg font-semibold transition-all hover:scale-105 ${lang === 'de' ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            🇩🇪
          </button>
          <button 
            onClick={() => onLanguageChange('en')} 
            className={`px-4 py-2 rounded-xl text-lg font-semibold transition-all hover:scale-105 ${lang === 'en' ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            🇬🇧
          </button>
        </div>
      </div>
      
      <p className="text-xl text-slate-400 text-center mb-12">{t.eachMission}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {getMissionData(lang).map((m) => (
          <button key={m.id} onClick={() => onSelect(m.id)} className="bg-slate-800 border-2 border-slate-700 hover:border-cyan-400 rounded-3xl p-10 text-left hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="text-6xl mb-4">{m.level === "easy" ? "🌱" : m.level === "mid" ? "🌿" : "🌳"}</div>
            <div className="text-sm uppercase tracking-widest text-slate-400 mb-2">
              {t.levelLabel} {m.level === "easy" ? t.easy : m.level === "mid" ? t.medium : t.hard}
            </div>
            <div className="text-2xl font-bold text-white mb-3">{m.title}</div>
            <div className="text-slate-400">{m.story.substring(0, 80)}...</div>
          </button>
        ))}
      </div>
    </div>
  </div>
)

const Console = ({ lines, t }: { lines: ConsoleLine[]; t: any }) => (
  <div className="bg-slate-900 border-t border-slate-700 p-5">
    <h4 className="text-sm font-bold text-slate-400 mb-3 flex items-center gap-2">💬 {t.mauziAide}</h4>
    <div className="font-mono text-sm space-y-1 max-h-32 overflow-y-auto">
      {lines.length === 0 ? (
        <div className="text-slate-600">{t.waitingForYou}</div>
      ) : (
        lines.map((line, i) => (
          <div key={i} className={`flex items-center gap-3 ${line.color}`}>
            <span className="text-slate-500 text-xs">[{line.time}]</span>
            {line.text}
          </div>
        ))
      )}
    </div>
  </div>
)

const CodeBuilder = ({ 
  mission, 
  program, 
  validation, 
  consoleLines,
  onAddBlock, 
  onRemoveBlock, 
  onValidate, 
  onReset,
  t,
  onLanguageChange,
  lang
}: any) => {
  const correctSeq = mission.correctSequence
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-indigo-900">
      {/* FRIENDLY ERROR BANNER AT TOP IF THERE'S AN ERROR */}
      {validation && !validation.valid && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-5 border-b-3 border-orange-600 shadow-lg fade-in">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-4xl mb-2">🤔</div>
            <div className="text-xl font-bold text-white">{validation.message}</div>
            <div className="text-sm text-orange-100 mt-1">{t.removeWrongBlock}</div>
          </div>
        </div>
      )}

      <div className="bg-slate-900/90 backdrop-blur border-b border-slate-700 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onReset} className="text-slate-400 hover:text-white text-2xl">←</button>
          <div>
            <h1 className="text-3xl font-extrabold text-white">{mission.title}</h1>
            <p className="text-slate-400">
              {mission.level === "easy" ? t.easy : mission.level === "mid" ? t.medium : t.hard}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onLanguageChange('de')} 
            className={`px-4 py-2 rounded-xl text-lg font-semibold transition-all hover:scale-105 ${lang === 'de' ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            🇩🇪
          </button>
          <button 
            onClick={() => onLanguageChange('en')} 
            className={`px-4 py-2 rounded-xl text-lg font-semibold transition-all hover:scale-105 ${lang === 'en' ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            🇬🇧
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-800/80 to-indigo-800/80 p-6 border-b border-slate-700">
        <p className="text-xl text-center text-slate-200 max-w-4xl mx-auto">{mission.story}</p>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 p-6">
        {/* Left: Available Blocks */}
        <div className="col-span-3 bg-slate-800/70 rounded-3xl p-6 border border-slate-700 flex flex-col">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">🧱 {t.waitActions}</h3>
          <div className="flex-1 space-y-4">
            {mission.blocks.map((b: Block) => {
              const isAdded = program.includes(b.id)
              const hasError = validation && !validation.valid
              const isClickable = !isAdded && !hasError
              
              return (
                <div
                  key={b.id}
                  onClick={() => isClickable && onAddBlock(b.id)}
                  className={`
                    ${b.color} 
                    p-5 
                    rounded-2xl 
                    border-2 
                    ${isClickable ? "cursor-pointer hover:scale-105 hover:shadow-xl" : "opacity-40 cursor-not-allowed"} 
                    transition-all
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{b.icon}</span>
                    <span className="text-xl font-bold text-slate-800">{b.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Middle: Characters & Console */}
        <div className="col-span-5 bg-slate-800/50 rounded-3xl border border-slate-700 flex flex-col">
          <div className="flex-1 flex items-center justify-center gap-20 p-8">
            <div className="text-center">
              <div className="text-8xl mb-4 animate-pulse">🐕</div>
              <div className="text-xl font-bold text-orange-400">Pluto</div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">🐱</div>
              <div className="text-xl font-bold text-cyan-400">Mauzi</div>
            </div>
          </div>
          <Console lines={consoleLines} t={t} />
        </div>

        {/* Right: Program */}
        <div className="col-span-4 bg-slate-800/70 rounded-3xl p-6 border border-slate-700 flex flex-col">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">📝 {t.myProgram}</h3>
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[500px]">
            {program.map((id: string, index: number) => {
              const block = mission.blocks.find((b: Block) => b.id === id)
              const isCorrect = index < correctSeq.length && id === correctSeq[index]
              const isWrong = validation && !validation.valid && index === validation.wrongIndex
              
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-slate-500 w-10 text-center">{index + 1}.</div>
                  <div className={`
                    flex-1 
                    ${block.color} 
                    p-5 
                    rounded-2xl 
                    border-4 
                    ${isCorrect ? "border-green-500" : isWrong ? "border-red-500 animate-wiggle" : "border-transparent"} 
                    flex items-center gap-4 text-slate-800
                  `}>
                    <span className="text-4xl">{block.icon}</span>
                    <span className="text-xl font-bold">{block.label}</span>
                    <button 
                      onClick={() => onRemoveBlock(index)} 
                      className="ml-auto text-3xl hover:scale-125 transition-all text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )
            })}
            {[...Array(Math.max(0, correctSeq.length - program.length))].map((_, emptyIndex) => (
              <div key={`empty-${emptyIndex}`} className="flex items-center gap-4">
                <div className="text-2xl font-bold text-slate-500 w-10 text-center">{program.length + emptyIndex + 1}.</div>
                <div className="flex-1 bg-slate-900/50 border-2 border-dashed border-slate-700 p-5 rounded-2xl text-center text-slate-500">
                  ?
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={onValidate} 
            disabled={program.length === 0 || (validation && !validation.valid)} 
            className={`
              mt-6 
              w-full 
              py-5 
              rounded-2xl 
              text-2xl 
              font-bold 
              transition-all 
              ${program.length === 0 || (validation && !validation.valid) 
                ? "bg-slate-700 text-slate-500 cursor-not-allowed" 
                : "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-yellow-900 shadow-lg"
              }
            `}
          >
            ✅ {t.checkCode}
          </button>
        </div>
      </div>
    </div>
  )
}

const HardwareReady = ({ mission, onStart, t }: { mission: any; onStart: () => void; t: any }) => (
  <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-green-900/30">
    <div className="max-w-4xl w-full text-center">
      <div className="text-9xl mb-8 animate-bounce">🎉</div>
      <h2 className="text-5xl font-extrabold mb-6 text-green-400">{t.programPerfect}</h2>
      <p className="text-2xl text-slate-300 mb-10">{t.nowLegoCanGo}</p>
      
      <div className="bg-slate-800 rounded-3xl p-8 border border-green-500/50 mb-10">
        <h3 className="text-2xl font-bold mb-6 text-cyan-400">🗺️ {t.parkourMission}</h3>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {mission.hardwareMission.map((s: any, i: number) => (
            <div key={s.id} className="flex items-center gap-4">
              <div className="bg-slate-700 px-6 py-4 rounded-2xl border border-slate-600">
                <div className="text-2xl">📍</div>
                <div className="font-bold text-white">{s.label}</div>
              </div>
              {i < mission.hardwareMission.length - 1 && <div className="text-3xl text-slate-500">→</div>}
            </div>
          ))}
        </div>
      </div>

      <button onClick={onStart} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 px-16 py-6 rounded-3xl text-3xl font-extrabold shadow-2xl hover:scale-105 transition-all">
        🚗 {t.parkourStart}
      </button>
    </div>
  </div>
)

const HardwareRunning = ({ mission, hardwareSteps, onSimulate, onReset, t }: any) => (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-indigo-900">
    <div className="bg-slate-900/90 border-b border-slate-700 p-6 text-center">
      <h2 className="text-5xl font-extrabold text-white">🏁 {t.parkourRunning}</h2>
      <p className="text-xl text-slate-400 mt-2">{t.legosOnWay}</p>
    </div>
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="flex items-center justify-center gap-8 flex-wrap mb-12">
          <div className="text-8xl animate-bounce">🚗</div>
          <div className="text-5xl text-slate-600">→</div>
          <div className="text-8xl animate-pulse">🚗</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {hardwareSteps.map((s: HardwareStep, i: number) => {
            const colorClass = s.status === "success" ? "bg-green-900/30 border-green-500" : s.status === "active" ? "bg-cyan-900/30 border-cyan-500" : "bg-slate-800 border-slate-700"
            return (
              <div key={s.id} className={`${colorClass} border-2 rounded-3xl p-6 text-center`}>
                <div className="text-5xl mb-4">{s.status === "success" ? "✅" : s.status === "active" ? "🟡" : "⚪"}</div>
                <div className="text-xl font-bold text-white">{s.label}</div>
              </div>
            )
          })}
        </div>

        <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold mb-6 text-center text-cyan-400">🔧 {t.testUs}</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {mission.hardwareMission.map((s: any) => (
              <button key={s.id} onClick={() => onSimulate(s.sensor)} className="bg-slate-700 hover:bg-slate-600 px-6 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105">
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Success = ({ onAgain, onAnother, t }: { onAgain: () => void; onAnother: () => void; t: any }) => (
  <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-green-900/30">
    <div className="max-w-4xl w-full text-center">
      <div className="text-9xl mb-8 animate-bounce">🏆</div>
      <h2 className="text-6xl font-extrabold text-green-400 mb-6">{t.mauziSafe}</h2>
      <p className="text-2xl text-slate-300 mb-12">{t.youDidIt}</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button onClick={onAgain} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 px-12 py-5 rounded-3xl text-2xl font-extrabold shadow-2xl hover:scale-105 transition-all text-white">
          {t.again}
        </button>
        <button onClick={onAnother} className="bg-slate-700 hover:bg-slate-600 px-12 py-5 rounded-3xl text-2xl font-extrabold shadow-xl hover:scale-105 transition-all text-white">
          {t.otherMission}
        </button>
      </div>
    </div>
  </div>
)

const App = () => {
  const [lang, setLang] = useState<'en' | 'de'>('de')
  const [phase, setPhase] = useState<Phase>("welcome")
  const [currentMissionId, setCurrentMissionId] = useState<string | null>(null)
  const [program, setProgram] = useState<string[]>([])
  const [validation, setValidation] = useState<{ valid: boolean; wrongIndex: number; message: string } | null>(null)
  const [hardwareSteps, setHardwareSteps] = useState<HardwareStep[]>([])
  const [currentHardwareStepIndex, setCurrentHardwareStepIndex] = useState(0)
  const [consoleLines, setConsoleLines] = useState<ConsoleLine[]>([])
  const wsRef = useRef<WebSocket | null>(null)

  const t = translations[lang]
  const missions = useMemo(() => getMissionData(lang), [lang])
  const currentMission = missions.find(m => m.id === currentMissionId)

  // --- WebSocket Connection ---
  useEffect(() => {
    // Only connect during hardware phases
    if (phase !== "hardware-running" && phase !== "hardware-ready") {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      return;
    }

    const wsUrl = BACKEND_URL.replace("http", "ws") + "/ws";
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connected!");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleWebSocketMessage(message);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [phase, t]);

  // --- HELPERS ---
  const addConsoleLine = (text: string, type: "info" | "success" | "error" = "info") => {
    const colors = { info: "text-cyan-300", success: "text-green-400", error: "text-red-400" }
    const locale = lang === 'de' ? 'de-DE' : 'en-US'
    const newLine: ConsoleLine = { text, color: colors[type], time: new Date().toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" }) }
    setConsoleLines(prev => [...prev, newLine])
  }

  // Handle WebSocket messages from backend
  const handleWebSocketMessage = (msg: any) => {
    switch (msg.type) {
      case "HARDWARE_STEP_SUCCESS":
        addConsoleLine(`✅ ${t.successParkourDone}`, "success");
        if (currentMission) {
          setHardwareSteps(prev => {
            const newSteps = [...prev];
            const idx = newSteps.findIndex(s => s.sensor === msg.sensorId);
            if (idx !== -1) {
              newSteps[idx].status = "success";
              if (idx < newSteps.length - 1) {
                newSteps[idx + 1].status = "active";
                setCurrentHardwareStepIndex(idx + 1);
              }
            }
            return newSteps;
          });
        }
        break;
      case "HARDWARE_SUCCESS":
        addConsoleLine(`🏆 ${t.successParkourDone}`, "success");
        setTimeout(() => setPhase("success"), 1000);
        break;
      case "HARDWARE_ERROR":
      case "HARDWARE_WRONG_PATH":
        addConsoleLine(`❌ ${msg.message}`, "error");
        break;
    }
  }

  // When language changes, reset some state
  const handleLanguageChange = (newLang: 'en' | 'de') => {
    setLang(newLang)
    setProgram([])
    setValidation(null)
    setConsoleLines([])
  }

  // --- ACTIONS ---
  const startGame = () => setPhase("level-select")

  const selectMission = (id: string) => {
    setCurrentMissionId(id)
    setProgram([])
    setValidation(null)
    setConsoleLines([])
    setPhase("code-builder")
    addConsoleLine(`🎯 ${t.missionStart}`, "info")
  }

  const addBlock = (id: string) => {
    if (validation && !validation.valid) return
    
    if (!program.includes(id)) {
      const newProgram = [...program, id]
      setProgram(newProgram)
      
      if (currentMission) {
        const correctSeq = currentMission.correctSequence
        const index = newProgram.length - 1
        
        if (index < correctSeq.length && newProgram[index] !== correctSeq[index]) {
          const message = currentMission.hints[correctSeq[index]]
          setValidation({ valid: false, wrongIndex: index, message })
          addConsoleLine(`❌ ${t.oops} ${message}`, "error")
        } else {
          setValidation(null)
          const block = currentMission.blocks.find(b => b.id === id)
          if (block) {
            addConsoleLine(`➕ ${t.actionAdded} ${block.label}`, "info")
          }
        }
      }
    }
  }

  const removeBlock = (index: number) => {
    const block = currentMission?.blocks.find(b => b.id === program[index])
    setProgram(program.filter((_, i) => i !== index))
    setValidation(null)
    if (block) {
      addConsoleLine(`➖ ${t.actionRemoved} ${block.label}`, "info")
    }
  }

  const validateProgram = async () => {
    if (!currentMission) return;
    const correctSeq = currentMission.correctSequence;
    const difficulty = currentMission.level;

    try {
      const response = await fetch(`${BACKEND_URL}/api/program/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          program,
          difficulty
        })
      });

      const result = await response.json();

      if (result.success) {
        setValidation({ valid: true, wrongIndex: -1, message: "Super!" });
        addConsoleLine(`✅ ${t.successParkourDone}`, "success");
        setTimeout(() => {
          setHardwareSteps(currentMission.hardwareMission.map((s, i) => ({ ...s, status: i === 0 ? "active" : "pending" })));
          setCurrentHardwareStepIndex(0);
          setPhase("hardware-ready");
        }, 1500);
      } else {
        const wrongIndex = result.steps?.findIndex((s: any) => !s.success) ?? program.length;
        const message = result.steps?.[wrongIndex]?.message || result.errors?.[0] || "Fehler!";
        setValidation({ valid: false, wrongIndex, message });
        addConsoleLine(`❌ ${t.oops} ${message}`, "error");
      }

    } catch (error) {
      // Fallback to local validation if backend is down
      console.error("Backend error, using local validation", error);
      validateProgramLocal();
    }
  };

  // Fallback local validation
  const validateProgramLocal = () => {
    if (!currentMission) return;
    const correctSeq = currentMission.correctSequence;

    for (let i = 0; i < program.length; i++) {
      if (program[i] !== correctSeq[i]) {
        const message = currentMission.hints[correctSeq[i]];
        setValidation({ valid: false, wrongIndex: i, message });
        addConsoleLine(`❌ ${t.oops} ${message}`, "error");
        return;
      }
    }

    if (program.length < correctSeq.length) {
      const message = lang === 'de' ? "Es fehlt noch mindestens eine Aktion!" : "At least one action is still missing!";
      setValidation({ valid: false, wrongIndex: program.length, message });
      addConsoleLine(`⚠️ ${message}`, "error");
      return;
    }

    setValidation({ valid: true, wrongIndex: -1, message: "Super!" });
    addConsoleLine(`✅ ${t.successParkourDone}`, "success");
    
    setTimeout(() => {
      setHardwareSteps(currentMission.hardwareMission.map((s, i) => ({ ...s, status: i === 0 ? "active" : "pending" })));
      setCurrentHardwareStepIndex(0);
      setPhase("hardware-ready");
    }, 1500);
  };

  const startHardware = async () => {
    if (!currentMission) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/session/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          difficulty: currentMission.level
        })
      });
    } catch (error) {
      console.error("Backend error, starting local simulation", error);
    }

    setPhase("hardware-running");
    addConsoleLine(`🚗 ${t.parkourStart}`, "info");
  };

  const simulateHardwareStep = (sensorId: string) => {
    if (!currentMission) return
    const currentStep = hardwareSteps[currentHardwareStepIndex]

    if (currentStep.sensor === sensorId) {
      const newSteps = [...hardwareSteps]
      newSteps[currentHardwareStepIndex].status = "success"
      addConsoleLine(`✅ ${t.successParkourDone}`, "success")

      if (currentHardwareStepIndex < currentMission.hardwareMission.length - 1) {
        newSteps[currentHardwareStepIndex + 1].status = "active"
        setCurrentHardwareStepIndex(currentHardwareStepIndex + 1)
        setHardwareSteps(newSteps)
      } else {
        setHardwareSteps(newSteps)
        setTimeout(() => {
          addConsoleLine(`🏆 ${t.successParkourDone}`, "success")
          setPhase("success")
        }, 1000)
      }
    } else {
      addConsoleLine(`❌ ${t.errorWrongPath} ${currentStep.label}`, "error")
    }
  }

  const resetGame = () => {
    setPhase("welcome")
    setCurrentMissionId(null)
    setProgram([])
    setValidation(null)
    setHardwareSteps([])
    setCurrentHardwareStepIndex(0)
    setConsoleLines([])
  }

  // --- RENDER ---
  switch (phase) {
    case "welcome": return <Welcome onStart={startGame} t={t} onLanguageChange={handleLanguageChange} lang={lang} />
    case "level-select": return <LevelSelect onSelect={selectMission} t={t} onLanguageChange={handleLanguageChange} lang={lang} />
    case "code-builder": return currentMission ? (
      <CodeBuilder
        mission={currentMission}
        program={program}
        validation={validation}
        consoleLines={consoleLines}
        onAddBlock={addBlock}
        onRemoveBlock={removeBlock}
        onValidate={validateProgram}
        onReset={() => setPhase("level-select")}
        t={t}
        onLanguageChange={handleLanguageChange}
        lang={lang}
      />
    ) : null
    case "hardware-ready": return currentMission ? <HardwareReady mission={currentMission} onStart={startHardware} t={t} /> : null
    case "hardware-running": return currentMission ? (
      <HardwareRunning
        mission={currentMission}
        hardwareSteps={hardwareSteps}
        onSimulate={simulateHardwareStep}
        onReset={resetGame}
        t={t}
      />
    ) : null
    case "success": return (
      <Success
        onAgain={resetGame}
        onAnother={() => {
          setPhase("level-select")
          setProgram([])
          setValidation(null)
          setConsoleLines([])
        }}
        t={t}
      />
    )
    default: return <Welcome onStart={startGame} t={t} onLanguageChange={handleLanguageChange} lang={lang} />
  }
}

export default App
