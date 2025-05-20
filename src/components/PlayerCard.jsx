import React, { useRef, useState, useEffect } from 'react';

function PlayerCard({ player, selected = false }) {
    const [imgError, setImgError] = useState(false);
    const [dragging, setDragging] = useState(false);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const imgRef = useRef(null);

    const handleDragStart = (e) => {
        setDragging(true);
        e.dataTransfer.setData('playerId', player.id);

        const img = new Image();
        img.src = player.image;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 20;
            canvas.height = 20;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 20, 20);
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

    const imageSrc = imgError
        ? `https://via.placeholder.com/100x100?text=${player.name}`
        : player.image;

    // Mobile fallback
    if (isTouchDevice) {
        return (
            <div
                className={`player-card${selected ? ' selected' : ''}${dragging ? ' dragging' : ''}`}
                draggable={!isTouchDevice}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <img
                    src={imageSrc}
                    alt={player.name}
                    onError={() => setImgError(true)}
                />
                <p>{player.name}</p>
                <small style={{ fontSize: '0.7rem', color: '#f88' }}>
                    Solo disponible en versión web
                </small>
            </div>
        );
    }

    // Desktop drag & drop
    return (
        <div
            className={`player-card${selected ? ' selected' : ''}${dragging ? ' dragging' : ''}`}
            draggable
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
