"use client";
import React, { useState, useEffect, useRef } from "react";
import SubLayer from "../SubLayer/SubLayer";

const MediaLayer = ({ type = "audio" || "video", divisions = 2 }) => {
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(200);

  useEffect(() => {
    setContainerHeight(containerRef.current.clientHeight);
  }, [containerRef.current]);

  const sublayer_height = containerHeight / divisions;
  return (
    <div
      className="w-full flex flex-col  rounded min-w-[600px]  min-h-[10rem] "
      ref={containerRef}
    >
      {Array.from(Array(divisions), (_, index) => index).map((_, idx) => (
        <SubLayer
          key={idx}
          sublayer_height={sublayer_height}
          id={idx}
          mediaType={"visual"}
        />
      ))}
    </div>
  );
};

export default MediaLayer;
