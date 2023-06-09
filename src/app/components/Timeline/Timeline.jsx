"use client";
import { MediaContext } from "@/app/page";
import React, { useState, useEffect, useRef, useContext } from "react";

const Timeline = ({
  n_subdivision = 1,
  indicators_width = 100,
  height = "min-h-[6rem]",
  divisions = false,
  secondsList,
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
      className={` min-w-fit w-full border dark:border-white border-black rounded  ${
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
              {secondsList && secondsList.length > 0 ? (
                <p
                  style={{ width: indicators_width }}
                  className="absolute text-xs text-center top-5"
                >
                  {secondsList[idx]}
                </p>
              ) : null}
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
