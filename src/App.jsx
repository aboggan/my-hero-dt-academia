import React from 'react';
import { FieldProvider } from './context/FieldContext';
import { FormationProvider } from './context/FormationContext';
import { PlayerListProvider } from './context/PlayerListContext';
import FormationSelect from './components/FormationSelect';
import PlayerListSelect from './components/PlayerListSelect';
import SaveControls from './components/SaveControls';
import Field from './components/Field';
import PlayerList from './components/PlayerList';

function App() {
  return (
    <FieldProvider>
      <FormationProvider>
        <PlayerListProvider>
          <div className="app-layout">
            <div className="field-column">
              <FormationSelect />
              <PlayerListSelect />
              <SaveControls />
              <Field />
            </div>
            <PlayerList />
          </div>
        </PlayerListProvider>
      </FormationProvider>
    </FieldProvider>
  );
}

export default App;
