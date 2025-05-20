import React from 'react';

function ZoomControls({ zoom, onZoomIn, onZoomOut }) {
  return (
    <div className="zoom-controls">
      <button onClick={onZoomOut}>–</button>
      <span>{Math.round(zoom * 100)}%</span>
      <button onClick={onZoomIn}>+</button>
    </div>
  );
}

export default ZoomControls;
