import { createContext, useContext, useState } from 'react';

const FieldContext = createContext();

export function FieldProvider({ children }) {
  const [slots, setSlots] = useState(Array(11).fill(null));
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const setPlayerAtSlot = (index, playerId) => {
    const newSlots = [...slots];
    const currentIndex = newSlots.findIndex((id) => id === playerId);
    if (currentIndex !== -1) newSlots[currentIndex] = null;
    newSlots[index] = playerId;
    setSlots(newSlots);
  };

  const removePlayer = (playerId) => {
    setSlots((prev) => prev.map((id) => (id === playerId ? null : id)));
  };

  return (
    <FieldContext.Provider
      value={{
        slots,
        setPlayerAtSlot,
        removePlayer,
        selectedPlayer,
        setSelectedPlayer,
      }}
    >
      {children}
    </FieldContext.Provider>
  );
}

export const useField = () => useContext(FieldContext);
