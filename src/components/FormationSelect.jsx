import React from 'react';
import { useFormation } from '../context/FormationContext';
import { formations } from '../utils/formations';

function FormationSelect() {
  const { formationId, setFormationId } = useFormation();

  return (
    <div className="formation-select">
      <label htmlFor="formation">Formación:</label>
      <select
        id="formation"
        value={formationId}
        onChange={(e) => setFormationId(e.target.value)}
      >
        {Object.entries(formations).map(([id, f]) => (
          <option key={id} value={id}>{f.name}</option>
        ))}
      </select>
    </div>
  );
}

export default FormationSelect;
