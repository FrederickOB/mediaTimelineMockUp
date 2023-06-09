"use client";
import { MediaContext } from "@/app/page";
import React, { useState, useEffect, useRef, useContext } from "react";

const Timeline = ({
  n_subdivision = 1,
  indicators_width = 100,
  height = "min-h-[6rem]",
  divisions = false,
}) => {
  const containerRef = useRef(null);
  const { timelineWidth, setTimelineWidth } = useContext(MediaContext);

  useEffect(() => {
    setTimelineWidth(containerRef.current.clientWidth);
  }, [containerRef.current]);

  const n_indicators = Math.round(timelineWidth / indicators_width) + 1;
  const subdivision_width = indicators_width / (n_subdivision + 1);
  return (
    <div
      className={` min-w-fit w-full border rounded  ${
        divisions ? "divide-white" : "divide-white/5"
      } divide-x flex ${height}`}
      ref={containerRef}
    >
      {Array.from(Array(n_indicators), (_, index) => index).map((_, idx) => (
        <div
          key={idx}
          className="flex divide-x divide-white/20"
          style={{ width: indicators_width }}
        >
          {divisions ? (
            <>
              <p className="absolute top-5 text-xs">{idx * 10}</p>
              {Array.from(Array(n_subdivision + 1), (_, index) => index).map(
                (_, idx) => (
                  <div
                    key={idx}
                    className="flex"
                    style={{ width: subdivision_width }}
                  ></div>
                )
              )}
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
