import React, { useState, useEffect } from 'react';
import { useField } from '../context/FieldContext';
import { usePlayerList } from '../context/PlayerListContext';
import { playerLists } from '../utils/playerLists';

function FieldSlot({ index }) {
  const {
    slots,
    setPlayerAtSlot,
    swapPlayers,
    selectedPlayer,
    setSelectedPlayer,
  } = useField();

  const [dragging, setDragging] = useState(false);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const playerId = slots[index];
  
  const { listId } = usePlayerList();
  const player = playerLists[listId].players.find(p => p.id === playerId);
  const highlightEmpty = isTouchDevice && selectedPlayer && !player;
  const highlightSelected = isTouchDevice && player && selectedPlayer === playerId;

  const handleClick = () => {
    if (!isTouchDevice) return;

    if (player && selectedPlayer) {
      // swap two players already on the field
      const fromIndex = slots.findIndex(id => id === selectedPlayer);
      swapPlayers(fromIndex, index);
      setSelectedPlayer(null);
    } else if (player) {
      // select this player for moving
      setSelectedPlayer(playerId);
    } else if (selectedPlayer) {
      // place selected player into empty slot
      setPlayerAtSlot(index, selectedPlayer);
      setSelectedPlayer(null);
    }
  };

  const handleDragStart = e => {
    if (isTouchDevice || !playerId) return;
    setDragging(true);

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('playerId', playerId);

    e.dataTransfer.setData('originIndex', index.toString());
    const img = new Image();
    img.src = player.image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 20;
      canvas.height = 20;
      canvas.getContext('2d').drawImage(img, 0, 0, 20, 20);
      e.dataTransfer.setDragImage(canvas, 10, 10);
    };
  };

  const handleDragEnd = () => setDragging(false);

  const handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  const handleDrop = e => {
    e.preventDefault();
    const droppedId =
      e.dataTransfer.getData('playerId') ||
      e.dataTransfer.getData('text/plain');
    if (!droppedId) return;
    const origin = e.dataTransfer.getData('originIndex');
    if (origin) {
      swapPlayers(parseInt(origin, 10), index);
    } else {
      setPlayerAtSlot(index, droppedId);
    }
  };

  useEffect(() => {
    window.addEventListener('dragend', handleDragEnd);
    return () => window.removeEventListener('dragend', handleDragEnd);
  }, []);

  return (
    <div
      className={
        'field-slot' +
        (highlightEmpty ? ' highlight' : '') +
        (highlightSelected ? ' selected-slot' : '') +
        (dragging ? ' dragging' : '')
      }
      onClick={handleClick}
      draggable={!isTouchDevice && !!playerId}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {player && (
        <>
          <img src={player.image} alt={player.name} />
          <div className="slot-name">{player.name}</div>
        </>
      )}
    </div>
  );
}

export default FieldSlot;
