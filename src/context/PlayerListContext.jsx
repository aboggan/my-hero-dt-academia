import React, { createContext, useContext, useState, useEffect } from 'react';

const PlayerListContext = createContext();

export function PlayerListProvider({ children }) {
  // Restaurar lista guardada o usar 'hayAlgoAhi' por defecto
  const savedList = localStorage.getItem('myHeroDT_PlayerList') || 'hayAlgoAhi';
  const [listId, setListId] = useState(savedList);

  // Cada vez que cambie, guardar en localStorage
  useEffect(() => {
    localStorage.setItem('myHeroDT_PlayerList', listId);
  }, [listId]);
  return (
    <PlayerListContext.Provider value={{ listId, setListId }}>
      {children}
    </PlayerListContext.Provider>
  );
}

export const usePlayerList = () => useContext(PlayerListContext);
