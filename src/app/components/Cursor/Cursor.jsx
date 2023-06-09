"use client";
import { MediaContext } from "@/app/page";
import React, { useContext, useState, useRef, useEffect } from "react";

const Cursor = ({ onPlay = false }) => {
  const { timelineWidth } = useContext(MediaContext);
  let draggingOffsetX = 0;
  let initialX = 0;
  const elementRef = useRef(null);

  const handleMouseDown = (event) => {
    draggingOffsetX =
      event.clientX - elementRef.current.getBoundingClientRect().left;
    initialX = elementRef.current.offsetLeft;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const x = event.clientX - draggingOffsetX;
    if (x >= 0 && x <= timelineWidth) {
      elementRef.current.style.transform = `translateX(${x}px)`;
    } else if (x > timelineWidth) {
      elementRef.current.style.transform = `translateX(${timelineWidth}px)`;
    } else {
      elementRef.current.style.transform = `translateX(0px)`;
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  return (
    <div
      id="cursor"
      className=" cursor-pointer absolute z-20 flex ease-linear flex-col items-center justify-center h-full -ml-2 top-[1.6rem]"
      style={
        onPlay
          ? {
              transform: `translateX(${timelineWidth}px)`,
              transitionDuration: `${timelineWidth * 60}ms`,
            }
          : {}
      }
      ref={elementRef}
      onMouseDown={handleMouseDown}
      //   onMouseMove={handleMouseMove}
    >
      <div
        className="w-5 bg-red-500 h-[0.8rem]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)",
        }}
      ></div>
      {/* <div className="w-[0.8rem] bg-red-500 h-[0.85rem] -rotate-45 transform origin-top-left -ml-1"></div> */}
      <div className="w-[0.1rem] h-full bg-red-500 "></div>
    </div>
  );
};

export default Cursor;
