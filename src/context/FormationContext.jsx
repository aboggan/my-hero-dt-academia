import { createContext, useContext, useState } from 'react';

const FormationContext = createContext();

export function FormationProvider({ children }) {
  const [formationId, setFormationId] = useState('4-3-3'); // fallback por defecto

  return (
    <FormationContext.Provider value={{ formationId, setFormationId }}>
      {children}
    </FormationContext.Provider>
  );
}

export const useFormation = () => useContext(FormationContext);
