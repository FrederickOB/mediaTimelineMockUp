import { useContext, useRef, useState } from "react";
import Timeline from "../Timeline/Timeline";
import { MediaContext } from "@/app/page";
import MediaItem from "../MediaItem/MediaItem";

const SubLayer = ({ mediaType, id }) => {
  const { selectedMedia } = useContext(MediaContext);
  const containerRef = useRef(null);
  const [layerMedia, setLayerMedia] = useState([]);
  const [movable, setMovable] = useState(null);

  const handleMediaItemDragStart = (e, mediaItemIndex) => {
    const clientX = e.clientX;
    setMovable({
      currentElementIndex: mediaItemIndex,
      startX: clientX,
    });
  };

  const handleMediaItemDragging = (e) => {
    if (!movable) return;
    const currentClientX = e.clientX;
    const moveMouseX = currentClientX - movable.startX;
    const index = movable.currentElementIndex;
    // const layerKey = movable.currentLayer;
    layerMedia[index].leftOffset = layerMedia[index].leftOffset + moveMouseX;
    setMovable({
      currentElementIndex: index,
      startX: currentClientX,
    });
  };

  const handleMediaItemDragEnd = () => {
    setMovable(null);
  };

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

    const mediaWidth = data.duration > 100 ? data.duration : 100;

    const overlapHandler = (x) => {
      const isOverLap = (leftOffset) =>
        layerMedia.filter((media) =>
          leftOffset < media.leftOffset + mediaWidth &&
          leftOffset + mediaWidth > media.leftOffset
            ? media
            : false
        );

      let adjustedX = x;

      let isStillOverlapping = true;
      while (isStillOverlapping) {
        const overlaps = isOverLap(adjustedX);

        if (overlaps.length > 0) {
          const midpoint =
            overlaps.reduce((sum, media) => sum + media.leftOffset, 0) /
            overlaps.length;

          if (adjustedX > midpoint) {
            // Move to the right
            adjustedX =
              overlaps[overlaps.length - 1].leftOffset +
              overlaps[overlaps.length - 1].duration;
          } else {
            // Move to the left
            const newOffset = overlaps[0].leftOffset - mediaWidth;
            if (newOffset < 0) {
              alert(
                "will not fit in this space adjust the items on the timeline"
              );
              adjustedX = undefined;
            } else {
              adjustedX = newOffset;
            }
          }
        } else {
          isStillOverlapping = false;
        }
      }

      return adjustedX;
    };

    const adjustedX = overlapHandler(x);
    // console.log(adjustedX);
    if (adjustedX) {
      setLayerMedia((prev) => [
        ...prev,
        { ...data, leftOffset: adjustedX, id: droppedElementId },
      ]);
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center w-full rounded-lg "
      style={{ height: "100px" }}
      onDrop={
        accepts[mediaType]?.includes(selectedMedia.type) ? handleDrop : null
      }
      onDragOver={
        accepts[mediaType]?.includes(selectedMedia.type) ? handleDragOver : null
      }
      onMouseMove={(e) => handleMediaItemDragging(e)}
      onMouseUp={() => handleMediaItemDragEnd()}
    >
      {/* <div className="absolute z-[100] top-0 p-1 text-xs bg-black/50">
        {mediaType} track
      </div> */}
      {layerMedia && layerMedia.length > 0
        ? layerMedia.map((media, index) => (
            <MediaItem
              key={index}
              media={media}
              deleteItem={removeItem}
              index={index}
              handleMediaItemDragStart={handleMediaItemDragStart}
            />
          ))
        : null}
      <Timeline />
    </div>
  );
};

export default SubLayer;
