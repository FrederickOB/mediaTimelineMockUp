"use client";
import React, { useContext, useRef, useState } from "react";
import {
  PhotoIcon,
  VideoCameraIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/solid";
import { MediaContext } from "@/app/page";

export const colors = {
  audio: "border-orange-600 bg-orange-600/40",
  video: "border-green-600 bg-green-600/40",
  image: "border-indigo-600 bg-indigo-600/40",
};

export const icons = {
  audio: <MicrophoneIcon className="w-6 h-6 text-black dark:text-white/40" />,
  video: <VideoCameraIcon className="w-6 h-6 text-black dark:text-white/40" />,
  image: <PhotoIcon className="w-6 h-6 text-black dark:text-white/40" />,
};

const MediaPreview = ({ mediaItem, id }) => {
  const { setSelectedMedia } = useContext(MediaContext);
  const mediaRef = useRef(null);
  const [duration, setDuration] = useState(0);

  const getMediaType = () => {
    return mediaItem.type.split("/")[0]; // Get the media type from the MIME type
  };

  const handleDrag = (event, mediaItem) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      var aud = new Audio(e.target.result);
      aud.onloadedmetadata = (ev) => {
        setDuration(ev.target.duration);
      };
    };
    reader.readAsDataURL(mediaItem);

    const data = {
      name: mediaItem.name,
      type: getMediaType(),
      duration: duration,
    };
    // console.log(duration);
    event.dataTransfer.setData("media", JSON.stringify(data));

    event.dataTransfer.setData("id", id);
    setSelectedMedia(data);
    // event.preventDefault();
  };

  return (
    <div
      className="w-full h-full p-2 space-y-2 border rounded cursor-pointer "
      draggable
      // id={id}
      ref={mediaRef}
      onDragStart={(event) => handleDrag(event, mediaItem)}
      onDragEnd={() => (mediaRef.current.style.position = "")}
    >
      {mediaItem ? (
        <>
          <div
            className={`w-full h-20  ${
              colors[getMediaType()]
            } flex justify-center items-center rounded`}
          >
            {icons[getMediaType()]}
          </div>
          <p className="text-xs text-center truncate">{mediaItem.name}</p>
        </>
      ) : null}
    </div>
  );
};

export default MediaPreview;
