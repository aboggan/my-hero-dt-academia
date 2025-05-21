import React, { createContext, useContext, useState } from 'react';

const FieldContext = createContext();

export function FieldProvider({ children }) {
  const [slots, setSlots] = useState(Array(11).fill(null));
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const setPlayerAtSlot = (index, playerId) => {
    setSlots(prev => {
      const newSlots = [...prev];
      const currentIndex = newSlots.findIndex(id => id === playerId);
      if (currentIndex !== -1) newSlots[currentIndex] = null;
      newSlots[index] = playerId;
      return newSlots;
    });
  };

  const removePlayer = (playerId) => {
    setSlots(prev =>
      prev.map(id => (id === playerId ? null : id))
    );
  };

  const swapPlayers = (fromIndex, toIndex) => {
    setSlots(prev => {
      const newSlots = [...prev];
      const tmp = newSlots[toIndex];
      newSlots[toIndex] = newSlots[fromIndex];
      newSlots[fromIndex] = tmp;
      return newSlots;
    });
  };

  return (
    <FieldContext.Provider value={{
      slots,
      setPlayerAtSlot,
      removePlayer,
      swapPlayers,
      selectedPlayer,
      setSelectedPlayer,
    }}>
      {children}
    </FieldContext.Provider>
  );
}

export const useField = () => useContext(FieldContext);
