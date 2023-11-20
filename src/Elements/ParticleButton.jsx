// ParticleButton.js

import React, { useState } from "react";
import "./ParticleButton.css";

const ParticleButton = () => {
  const [particles, setParticles] = useState([]);

  const randomLocation = () => {
    return {
      x: Math.random() * window.innerWidth - window.innerWidth / 2 + "px",
      y: Math.random() * window.innerHeight - window.innerHeight / 2 + "px",
    };
  };

  const randomColor = () => {
    return `hsl(${Math.floor(Math.random() * 361)}, 100%, 50%)`;
  };

  const handleClick = () => {
    const newParticles = [];
    const color = randomColor();

    const particle = (
      <span
        key={newParticles.length}
        className="particle move"
        style={{
          "--x": "0px",
          "--y": "0px",
          background: color,
        }}
      ></span>
    );

    newParticles.push(particle);

    setTimeout(() => {
      for (let i = 0; i < 100; i++) {
        const { x, y } = randomLocation();

        const innerP = (
          <span
            key={newParticles.length}
            className="particle move"
            style={{
              transform: `translate(${x}, ${y})`,
              "--x": `calc(${x})`,
              "--y": `calc(${y})`,
              animationDuration: Math.random() * 300 + 200 + "ms",
              background: color,
            }}
          ></span>
        );

        newParticles.push(innerP);
      }

      setTimeout(() => {
        setParticles([]);
      }, 1000);
    }, 1000);

    setParticles(newParticles);
  };

  return (
    <button className="particle-button" onClick={handleClick}>
      {particles}
    </button>
  );
};

export default ParticleButton;
