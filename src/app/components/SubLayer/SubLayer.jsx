import { useContext, useRef, useState } from "react";
import Timeline from "../Timeline/Timeline";
import { MediaContext } from "@/app/page";
import MediaItem from "../MediaItem/MediaItem";

const SubLayer = ({ sublayer_height, mediaType, id }) => {
  const { selectedMedia } = useContext(MediaContext);
  const containerRef = useRef(null);
  const [layerMedia, setLayerMedia] = useState([]);

  const removeItem = (id) => {
    const updatedItems = layerMedia.filter((_, index) => index !== id);
    setLayerMedia(updatedItems);
  };

  const accepts = { audio: ["audio"], visual: ["video", "image"] };

  const handleDrop = (event) => {
    const dataString = event.dataTransfer.getData("media");

    const droppedElementId = event.dataTransfer.getData("id");
    const droppedElement = document.getElementById(droppedElementId);
    const container = containerRef.current;

    const x = event.clientX - container.getBoundingClientRect().left;

    const data = JSON.parse(dataString);
    setLayerMedia((prev) => [
      ...prev,
      { ...data, leftOffset: x, id: droppedElementId },
    ]);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  return (
    <div
      ref={containerRef}
      className="relative flex items-center w-full rounded-lg"
      style={{ height: sublayer_height }}
      onDrop={
        accepts[mediaType]?.includes(selectedMedia.type) ? handleDrop : null
      }
      onDragOver={
        accepts[mediaType]?.includes(selectedMedia.type) ? handleDragOver : null
      }
    >
      {layerMedia && layerMedia.length > 0
        ? layerMedia.map((media, index) => (
            <MediaItem
              key={index}
              media={media}
              deleteItem={removeItem}
              index={index}
            />
          ))
        : null}
      <Timeline />
    </div>
  );
};

export default SubLayer;
