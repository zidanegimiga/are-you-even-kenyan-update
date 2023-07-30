import { useContext, createContext, useState } from "react";

const GameContext = createContext();

const GameProvider = ({children}) =>{
  const [score, setScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const calculateScore = () =>{
    const val = score/25 * 100;
    setTotalScore(val)
  }  

  return(
    <GameContext.Provider value={{ score, setScore, totalScore, calculateScore, setTotalScore, soundEnabled, setSoundEnabled }}>
      {children}
    </GameContext.Provider>
  )
}

export {GameProvider, GameContext}