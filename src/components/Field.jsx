import React from 'react';
import FieldSlot from './FieldSlot';
import { formations } from '../utils/formations';
import { useFormation } from '../context/FormationContext';
import { useField } from '../context/FieldContext';  // <— necesita setPlayerAtSlot

function Field() {
  const { formationId } = useFormation();
  const { setPlayerAtSlot } = useField();             // <— extraemos la función
  const formation = formations[formationId] || formations['4-3-3'];
  const dtIndex = formation.positions.length - 1;

  return (
    <div className="field">
      {formation.positions.map((pos, index) => {
        const isDT = index === dtIndex;
        return (
          <div
            key={index}
            className="slot-wrapper"
            style={{
              position: 'absolute',
              top: pos.top,
              left: pos.left,
              transform: 'translate(-50%, -50%)',
            }}
            onDragOver={e => e.preventDefault()}              // <— habilita drop
            onDrop={e => {
              e.preventDefault();
              const playerId = e.dataTransfer.getData('playerId');
              if (playerId) setPlayerAtSlot(index, playerId); // <— coloca al jugador
            }}
          >
            {isDT && <div className="dt-label">DT</div>}
            <FieldSlot index={index} />
          </div>
        );
      })}
    </div>
  );
}

export default Field;
