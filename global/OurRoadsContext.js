import { createContext, useState } from "react";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <GameContext.Provider value={{ score, setScore, soundEnabled, setSoundEnabled }}>
      {children}
    </GameContext.Provider>
  )
}

export { GameProvider, GameContext }