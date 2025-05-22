import React from 'react';
import PlayerCard from './PlayerCard';
import { useField } from '../context/FieldContext';
import { usePlayerList } from '../context/PlayerListContext';
import { playerLists } from '../utils/playerLists';

export default function PlayerList() {
  const { slots } = useField();
  const { listId } = usePlayerList();
  const players = playerLists[listId].players;

  return (
    <div className="player-list">
      {players.map(p => {
        const selected = slots.includes(p.id);
        return <PlayerCard key={p.id} player={p} selected={selected} />;
      })}
    </div>
  );
}
