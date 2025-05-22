import React, { createContext, useContext, useState, useEffect } from 'react';

const FormationContext = createContext();

export function FormationProvider({ children }) {
  // Restaurar formación guardada o usar 4-2-3-1 por defecto
  const savedFormation = localStorage.getItem('myHeroDT_Formation') || '4-2-3-1';
  const [formationId, setFormationId] = useState(savedFormation);

  // Cada vez que cambie, guardar en localStorage
  useEffect(() => {
    localStorage.setItem('myHeroDT_Formation', formationId);
  }, [formationId]);
  return (
    <FormationContext.Provider value={{ formationId, setFormationId }}>
      {children}
    </FormationContext.Provider>
  );
}

export const useFormation = () => useContext(FormationContext);
