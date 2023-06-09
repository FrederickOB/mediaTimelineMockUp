import { colors, icons } from "../MediaLibrary/MediaPreview";
import { TrashIcon } from "@heroicons/react/24/outline";

const MediaItem = ({ media, deleteItem, index }) => {
  return (
    <div
      className={`flex flex-col justify-between rounded-lg items-start border-2 dark:border-white border-black ${
        colors[media?.type]
      } h-[85%] absolute z-10 p-2 ml-1`}
      style={{ width: media?.duration || 100, left: media?.leftOffset || 0 }}
    >
      <div className="flex justify-between w-full">
        {icons[media?.type]}
        <TrashIcon
          className="w-5 h-5 cursor-pointer text-black dark:text-white/60"
          onClick={() => deleteItem(index)}
        />
      </div>
      <p className="text-[0.5rem] break-all text-left w-full">
        {media?.name || "name"}
      </p>
      {/* <p>{duration || "00:00"}</p> */}
    </div>
  );
};

export default MediaItem;
