"use client";
import React, { useRef, useState } from "react";

import { PlayCircleIcon } from "@heroicons/react/24/outline";
import Cursor from "../Cursor/Cursor";
import Timeline from "./Timeline";
import MediaLayer from "../MediaLayer/MediaLayer";

const TimelineContainer = () => {
  const [play, setPlay] = useState(false);
  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  const handleDragStart = (event) => {
    event.dataTransfer.effectAllowed = "move";
    draggingRef.current = true;
  };

  const handleDragEnd = () => {
    draggingRef.current = false;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrag = (event) => {
    if (!draggingRef.current) {
      return;
    }

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const elementRect = event.target.getBoundingClientRect();
    const x = event.clientX - containerRect.left - elementRect.width / 2;

    event.target.style.transform = `translateX(${x}px)`;
  };

  return (
    <>
      <div>
        <PlayCircleIcon
          className={`w-10 h-10 ${play ? "text-red-400" : "text-white"} `}
          onClick={() => setPlay((prev) => !prev)}
        />
      </div>
      <div
        ref={containerRef}
        onDragOver={handleDragOver}
        className="relative w-full h-full max-w-full py-4 space-y-2 overflow-x-scroll"
      >
        <Cursor onPlay={play} />
        <Timeline height="min-h-[1rem]" divisions={true} />
        <MediaLayer />
      </div>
    </>
  );
};

export default TimelineContainer;
