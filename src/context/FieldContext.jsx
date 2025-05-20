import { createContext, useContext, useState } from 'react';

const FieldContext = createContext();

export function FieldProvider({ children }) {
  const [slots, setSlots] = useState(Array(11).fill(null));

  const setPlayerAtSlot = (index, playerId) => {
    const newSlots = [...slots];
    const currentIndex = newSlots.findIndex(id => id === playerId);

    // Si ya está en otro slot, limpiamos esa posición
    if (currentIndex !== -1) {
      newSlots[currentIndex] = null;
    }

    newSlots[index] = playerId;
    setSlots(newSlots);
  };

  const removePlayer = (playerId) => {
    setSlots((prev) =>
      prev.map((id) => (id === playerId ? null : id))
    );
  };

  return (
    <FieldContext.Provider value={{ slots, setPlayerAtSlot, removePlayer }}>
      {children}
    </FieldContext.Provider>
  );
}

export const useField = () => useContext(FieldContext);
