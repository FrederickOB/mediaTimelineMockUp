"use client";
import React, { useState, useEffect, useRef } from "react";
import SubLayer from "../SubLayer/SubLayer";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
const MediaLayer = ({
  type = "audio" || "video",
  layersProp = [
    { type: "visual", id: 1 },
    { type: "audio", id: 2 },
  ],
}) => {
  const containerRef = useRef(null);
  const [layers, setLayers] = useState(layersProp);

  const removeItem = (id) => {
    const updatedLayers = layers.filter((item) => item.id !== id);
    setLayers(updatedLayers);
  };
  return (
    <div
      className="w-full flex flex-col  rounded min-w-[600px]   min-h-[10rem]  "
      ref={containerRef}
    >
      {layers.map((layer) => (
        <div className="relative" key={layer.id}>
          <SubLayer id={layer.id} mediaType={layer.type} />
          <button
            onClick={() => (layers.length > 2 ? removeItem(layer.id) : null)}
            className="absolute flex items-center space-x-1 text-xs text-black cursor-pointer top-2 right-2 dark:text-white/60"
          >
            <TrashIcon className="w-3 h-3" /> <p>track</p>
          </button>
          <button
            onClick={() =>
              setLayers((prev) => [
                ...prev,
                { type: layer.type, id: prev.length },
              ])
            }
            disabled={layers.length > 3}
            className="absolute flex items-center p-1 space-x-1 text-xs text-black rounded cursor-pointer bottom-2 left-2 dark:text-black/60 bg-black/60 dark:bg-white/60"
          >
            <PlusCircleIcon className="w-3 h-3" /> <p>{layer.type} track</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default MediaLayer;
