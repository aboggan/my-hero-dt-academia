import React, { useState, useEffect } from 'react';
import { useField } from '../context/FieldContext';
import { players } from '../utils/players';

function FieldSlot({ index }) {
  const { slots, setPlayerAtSlot } = useField();
  const playerId = slots[index];
  const player = players.find(p => p.id === playerId);
  const [imgError, setImgError] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Si arrastras dentro de la cancha
  const handleDragStart = e => {
    if (!playerId) return;
    setDragging(true);
    e.dataTransfer.setData('playerId', playerId);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  // Para asegurar reset si se suelta fuera
  useEffect(() => {
    window.addEventListener('dragend', handleDragEnd);
    return () => window.removeEventListener('dragend', handleDragEnd);
  }, []);

  const handleDrop = e => {
    e.preventDefault();
    const droppedId = e.dataTransfer.getData('playerId');
    if (droppedId) setPlayerAtSlot(index, droppedId);
  };
  const handleDragOver = e => e.preventDefault();

  return (
    <div
      className={`field-slot${dragging ? ' dragging' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {player ? (
        <>
          <img
            src={imgError ? `https://via.placeholder.com/80x80?text=${player.name}` : player.image}
            alt={player.name}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onError={() => setImgError(true)}
          />
          <div className="slot-name">{player.name}</div>
        </>
      ) : (
        <span>#{index + 1}</span>
      )}
    </div>
  );
}

export default FieldSlot;
