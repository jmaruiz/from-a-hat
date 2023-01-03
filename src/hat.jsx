import React, { useState } from 'react';

function Hat(props) {
  const [xPosition, setXPosition] = useState(0);

  function handleSwipe(event) {
    setXPosition(event.clientX);
  }

  return (
    <div
      onMouseMove={handleSwipe}
      style={{
        transform: `translateX(${xPosition}px)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {props.text}
    </div>
  );
}

export default Hat;