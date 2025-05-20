import React from 'react';
import { players } from '../utils/players';
import PlayerCard from './PlayerCard';
import { useField } from '../context/FieldContext';

function PlayerList() {
  const { slots } = useField();

  return (
    <div className="player-list">
      {players.map(player => {
        const selected = slots.includes(player.id);
        return <PlayerCard key={player.id} player={player} selected={selected} />;
      })}
    </div>
  );
}

export default PlayerList;
