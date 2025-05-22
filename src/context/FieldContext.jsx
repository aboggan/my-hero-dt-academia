import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'myHeroDT_FieldState';
const FieldContext = createContext();

export function FieldProvider({ children }) {
  // 1) Cargo del storage o arranco vacío
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  const [slots, setSlots] = useState(saved?.slots || Array(11).fill(null));
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // 2) Cada vez que cambian los slots, lo guardo
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ slots }));
  }, [slots]);

  const setPlayerAtSlot = (index, playerId) => {
    setSlots(prev => {
      const newSlots = [...prev];
      // si ya existía ese player en otro slot, lo limpio
      const old = newSlots.findIndex(id => id === playerId);
      if (old !== -1) newSlots[old] = null;
      newSlots[index] = playerId;
      return newSlots;
    });
  };

  const removePlayer = (playerId) => {
    setSlots(prev => prev.map(id => (id === playerId ? null : id)));
  };

  const swapPlayers = (fromIndex, toIndex) => {
    setSlots(prev => {
      const newSlots = [...prev];
      [newSlots[fromIndex], newSlots[toIndex]] = [newSlots[toIndex], newSlots[fromIndex]];
      return newSlots;
    });
  };

  const resetField = () => {
    setSlots(Array(11).fill(null));
    setSelectedPlayer(null);
  };

  return (
    <FieldContext.Provider value={{
      slots,
      setPlayerAtSlot,
      removePlayer,
      swapPlayers,
      selectedPlayer,
      setSelectedPlayer,
      resetField,
    }}>
      {children}
    </FieldContext.Provider>
  );
}

export const useField = () => useContext(FieldContext);
