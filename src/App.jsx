import React from 'react';
import Hero from './components/Hero';
import { FieldProvider } from './context/FieldContext';
import { FormationProvider } from './context/FormationContext';
import { PlayerListProvider } from './context/PlayerListContext';
import FormationSelect from './components/FormationSelect';
import PlayerListSelect from './components/PlayerListSelect';
import SaveControls from './components/SaveControls';
import Field from './components/Field';
import PlayerList from './components/PlayerList';
import Intro from './components/Intro';
import ShareButton from "./components/ShareButton";
function App() {
  return (
    <>
      <Hero />
      <Intro />
      <PlayerListProvider>
        <FieldProvider>
          <FormationProvider>

            <div className="app-layout">
              <div className="field-column">
                <div className="field-controls">
                  <FormationSelect />
                  <SaveControls />
                  <ShareButton />
                </div>
                <Field />
              </div>
              <div className="player-column">
                <PlayerListSelect />
                <PlayerList />
              </div>
            </div>

          </FormationProvider>
        </FieldProvider>
      </PlayerListProvider>
    </>
  );
}

export default App;
