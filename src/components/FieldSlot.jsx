import React, { useState, useEffect } from 'react';
import { useField } from '../context/FieldContext';
import { players } from '../utils/players';

function FieldSlot({ index }) {
  const {
    slots,
    setPlayerAtSlot,
    selectedPlayer,
    setSelectedPlayer,
  } = useField();

  const [dragging, setDragging] = useState(false);
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

  const handleDragStart = (e) => {
    if (isTouchDevice || !playerId) return;
    setDragging(true);
    e.dataTransfer.setData('playerId', playerId);
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

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData('playerId');
    if (droppedId) {
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
        (highlightSelectedSlot ? ' selected-slot' : '') +
        (dragging ? ' dragging' : '')
      }
      onClick={handleClick}
      draggable={!isTouchDevice && !!playerId}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {player ? (
        <>
          <img src={player.image} alt={player.name} />
          <div className="slot-name">{player.name}</div>
        </>
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default FieldSlot;
