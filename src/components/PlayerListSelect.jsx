import React from 'react';
import { usePlayerList } from '../context/PlayerListContext';
import { useField }      from '../context/FieldContext';  // ✅
import { playerLists }   from '../utils/playerLists';

export default function PlayerListSelect() {
  const { listId, setListId } = usePlayerList();
  const { resetField }        = useField();               // ✅

  const handleChange = e => {
    setListId(e.target.value);
    resetField();   // <<< limpia el field al cambiar de lista
  };

  return (
    <div className="player-list-select">
      <label htmlFor="playerList">Lista de jugadores:</label>
      <select
        id="playerList"
        value={listId}
        onChange={handleChange}    // usa el handler
      >
        {Object.values(playerLists).map(pl => (
          <option key={pl.id} value={pl.id}>
            {pl.name}
          </option>
        ))}
      </select>
    </div>
  );
}
