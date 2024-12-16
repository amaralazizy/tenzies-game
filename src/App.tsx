import { useEffect, useState } from "react";
import Die from "./components/die";
import Confetti from "react-confetti"; 

export default function App() {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isFrozen, setIsFrozen] = useState<{ [index: number]: number }>({});
  const [dieValues, setDieValues] = useState<number[]>([...Array(10).keys()]);

  function startNewGame(): void {
    setGameOver(false);
    setDieValues([...Array(10).keys()]);
    setIsFrozen({});
  }

  useEffect(() => {
    if (
      Object.keys(isFrozen).length === 10 && 
      new Set(dieValues).size === 1
    ) {
      setGameOver(true);
    }
  }, [isFrozen, dieValues]);

  function handleFrozen(index: number, key: number): void {
    setIsFrozen((prevIsFrozen) => {
        if (Object.keys(prevIsFrozen).includes(index.toString())) {
          const newIsFrozen = Object.fromEntries(
            Object.entries(prevIsFrozen).filter(
              ([key]) => key !== index.toString()
            )
          );
          return newIsFrozen;
        }
        
        return { ...prevIsFrozen, [index]: key }
    }
    );
    
    if (Object.keys(isFrozen).length === 9 && new Set(dieValues).size === 1) {
      setGameOver(true);
    }
  }
function handleRoll(): void {
  setDieValues((prevDieValues) =>
    prevDieValues.map((die, index) => {
      if (isFrozen[index] >= 0) 
        return die;

      let newDieValue = die;
      do {
        newDieValue = Math.round(Math.random() * 9);
      } while (newDieValue === die);
      
      return newDieValue;
    })
  );
}


  return (
    <div className="p-12 flex flex-col place-items-center gap-10 max-sm:px-5">
      {gameOver && <Confetti />}
      <h1 className="font-roboto text-6xl">Tenzies</h1>
      <p className="text-xl text-center">
        Roll until the dice are all the same. Click each die to freeze it at its
        current value between rolls
      </p>
      <div className="grid grid-cols-5 gap-5">
        {dieValues.map((die, index) => (
          <Die
            key={index}
            index={index}
            itemKey={die}
            setIsFrozen={handleFrozen}
            isFrozen={isFrozen}
          />
        ))}
      </div>
      <button
        className="bg-blue-600 px-7 py-2 text-xl text-white rounded-md"
        onClick={() => (gameOver ? startNewGame() : handleRoll())}
      >
        {gameOver ? "New game" : "Roll"}
      </button>
    </div>
  );
}
