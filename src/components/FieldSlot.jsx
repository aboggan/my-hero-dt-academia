import React from 'react';
import { useField } from '../context/FieldContext';
import { players } from '../utils/players';

function FieldSlot({ index }) {
  const {
    slots,
    setPlayerAtSlot,
    selectedPlayer,
    setSelectedPlayer,
  } = useField();

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const playerId = slots[index];
  const player = players.find((p) => p.id === playerId);

  const highlightEmpty = isTouchDevice && selectedPlayer && !player;
  const highlightSelectedSlot = isTouchDevice && player && selectedPlayer === playerId;

  const handleClick = () => {
    if (!isTouchDevice) return;
    if (player) {
      setSelectedPlayer(selectedPlayer === playerId ? null : playerId);
    } else if (selectedPlayer) {
      setPlayerAtSlot(index, selectedPlayer);
      setSelectedPlayer(null);
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData('playerId');
    if (droppedId) setPlayerAtSlot(index, droppedId);
  };

  return (
    <div
      className={
        'field-slot' +
        (highlightEmpty ? ' highlight' : '') +
        (highlightSelectedSlot ? ' selected-slot' : '')
      }
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {player ? (
        <>
          <img src={player.image} alt={player.name} draggable={!isTouchDevice} />
          <div className="slot-name">{player.name}</div>
        </>
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default FieldSlot;
