"use client";
import React, { useState } from "react";
import MediaPreview from "./MediaPreview";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const MediaLibrary = () => {
  const [media, setMedia] = useState([]);
  return (
    <div className="h-full p-4 overflow-y-scroll text-black border border-black rounded-lg shadow-xl dark:border-white glass dark:text-white">
      <h1 className="text-2xl font-bold text-center">Media Library</h1>
      <h1 className="font-bold text-center">{"(drag media to timeline)"}</h1>
      <div className="p-4">
        <div className="relative grid grid-cols-2 gap-10 md:grid-cols-3">
          {media && media.length > 0
            ? media.map((items, idx) => (
                <MediaPreview key={idx} mediaItem={items} id={idx} />
              ))
            : null}
          <div className="flex w-full h-full py-2 mb-10 text-sm font-medium leading-4 text-black dark:text-white/40 ite hover:text-black dark:text-white">
            <label
              htmlFor="media"
              className="flex flex-col items-center justify-center space-y-2 cursor-pointer"
            >
              <PlusCircleIcon className="w-12 h-12 " />
              <span>add media</span>
              <input
                id="media"
                name="media"
                type="file"
                accept="image/*,audio/*,video/*"
                className="sr-only"
                onChange={(event) => {
                  const files = Array.from(event.currentTarget.files);
                  setMedia((prev) => [...prev, ...files]);
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
