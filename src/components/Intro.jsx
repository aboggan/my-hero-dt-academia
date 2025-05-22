import React from 'react';
import '../styles/components/intro.scss';

export default function Intro() {
  return (
    <section className="intro">
      <p>¡Bienvenido a My Hero DT Academia!</p>
      <p>
        Este es un proyecto <strong>fan-made</strong>. 
        ¡Colabora con ideas e imágenes en 
        <a href="https://twitter.com/kamebostero" target="_blank" rel="noopener noreferrer">
          @kamebostero
        </a> en Twitter!
      </p>
    </section>
  );
}
