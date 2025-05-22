import React from 'react';
import { useField } from '../context/FieldContext';

export default function SaveControls() {
  const { resetField } = useField();

  return (
    <div className="save-controls" style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <button onClick={resetField}>
        🔄 Resetear alineación
      </button>
    </div>
  );
}
