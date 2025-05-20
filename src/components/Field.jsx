import React from 'react';
import FieldSlot from './FieldSlot';
import { formations } from '../utils/formations';
import { useFormation } from '../context/FormationContext';

function Field() {
  const { formationId } = useFormation();
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
