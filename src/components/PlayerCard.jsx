import React, { useRef, useState, useEffect } from 'react';
import { useField } from '../context/FieldContext';

function PlayerCard({ player, selected = false  }) {
  const {
    selectedPlayer,
    setSelectedPlayer
  } = useField();

  const [imgError, setImgError] = useState(false);
  const [dragging, setDragging] = useState(false);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const imgRef = useRef(null);

  const imageSrc = imgError
    ? `https://via.placeholder.com/100x100?text=${player.name}`
    : player.image;

  const isActive = isTouchDevice && selectedPlayer === player.id;

  const handleClick = () => {
    if (!isTouchDevice) return;
    setSelectedPlayer(isActive ? null : player.id);
  };

  const handleDragStart = (e) => {
    if (isTouchDevice) return;
    setDragging(true);
    e.dataTransfer.setData('playerId', player.id);
    const img = new Image();
    img.src = imageSrc;
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

  useEffect(() => {
    window.addEventListener('dragend', handleDragEnd);
    return () => window.removeEventListener('dragend', handleDragEnd);
  }, []);

  return (
    <div
      className={[
        'player-card',
        selected && ' selected',
        isActive && 'active',
        dragging && 'dragging'
      ].filter(Boolean).join(' ')}
      onClick={handleClick}
      draggable={!isTouchDevice}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <img
        ref={imgRef}
        src={imageSrc}
        alt={player.name}
        onError={() => setImgError(true)}
      />
      <p>{player.name}</p>
    </div>
  );
}

export default PlayerCard;
