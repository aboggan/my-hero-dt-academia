import React, { useState } from 'react';
import { useField } from '../context/FieldContext';
import { FaSyncAlt } from "react-icons/fa";

export default function ResetButton() {
  const { resetField } = useField();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = (e) => {
    resetField();
    setIsSpinning(true);
    e.currentTarget.blur();
    setTimeout(() => setIsSpinning(false), 700); // Igual a la duración del spin
  };

  return (
    <button className="reset-button" onClick={handleClick}>
      <FaSyncAlt className={`icon-reset${isSpinning ? " spinning" : ""}`} />
      Resetear
    </button>
  );
}
