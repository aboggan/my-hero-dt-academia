import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePlayerList } from './PlayerListContext';

const STORAGE_KEY = 'myHeroDT_FieldStates';
const FieldContext = createContext();

export function FieldProvider({ children }) {
  const { listId } = usePlayerList();
  const [slots, setSlots] = useState(Array(11).fill(null)); // Inicializa vacío
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Al cambiar listId, restaurá el field de esa lista
  useEffect(() => {
    const storedFields = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    setSlots(storedFields[listId] || Array(11).fill(null));
    setSelectedPlayer(null);
  }, [listId]);

  // Guardá siempre que cambian los slots
  useEffect(() => {
    if (!listId) return;
    const storedFields = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    storedFields[listId] = slots;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedFields));
  }, [slots, listId]);

  const setPlayerAtSlot = (index, playerId) => {
    setSlots(prev => {
      const newSlots = [...prev];
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

  const resetField = () => setSlots(Array(11).fill(null));

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

export function useField() {
  return useContext(FieldContext);
}
