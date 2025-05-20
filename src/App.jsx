import React from 'react';
import { FieldProvider } from './context/FieldContext';
import { FormationProvider } from './context/FormationContext';
import Field from './components/Field';
import PlayerList from './components/PlayerList';
import FormationSelect from './components/FormationSelect';

function App() {
  return (
    <FieldProvider>
      <FormationProvider>
        <div className="app-layout">
          <div className="field-column">
            <FormationSelect />
            <Field />
          </div>
          <PlayerList />
        </div>
      </FormationProvider>
    </FieldProvider>
  );
}

export default App;
