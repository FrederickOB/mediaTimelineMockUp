import React, { useRef, useState } from "react";

const DraggableElement = ({ id, text }) => {
 

  return (
    <div
      className="draggable-element"
  
    >
      Drag me along the X-axis
    </div>
  );
};

const ContainerComponent = () => {
  const containerRef = React.useRef(null);
  const draggingRef = React.useRef(false);
  const initialYRef = React.useRef(0);

  const handleDragStart = (event) => {
    event.dataTransfer.effectAllowed = "move";
    draggingRef.current = true;
    initialYRef.current = event.clientY;
  };

  const handleDragEnd = () => {
    draggingRef.current = false;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    if (!draggingRef.current) {
      return;
    }

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const elementRect = event.target.getBoundingClientRect();

    const x = event.clientX - containerRect.left - elementRect.width / 2;
    const y = initialYRef.current - containerRect.top - elementRect.height / 2;

    event.target.style.transform = `translate(${x}px, ${y}px)`;
  };

  return (
    <div
      className="container"
      ref={containerRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <DraggableElement id="element1" text="Element 1" />
      <DraggableElement id="element2" text="Element 2" />
      <DraggableElement id="element3" text="Element 3" />
    </div>
  );
};

export default ContainerComponent;
