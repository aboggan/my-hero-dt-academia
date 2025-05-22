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
              <div className="field-controls">
                <FormationSelect />
                <SaveControls />
                {/* próximamente: <ShareButton /> */}
              </div>
              <Field />
            </div>
            <div className="player-column">
              <PlayerListSelect />
              <PlayerList />
            </div>
          </div>
        </PlayerListProvider>
      </FormationProvider>
    </FieldProvider>
  );
}

export default App;
