"use client";
import MediaLibrary from "./components/MediaLibrary/MediaLibrary";
import { createContext, useMemo, useState } from "react";
import TimelineContainer from "./components/Timeline/TimelineContainer";

export const MediaContext = createContext({
  selectedMedia: [],
  setSelectedMedia: () => {},
  setTimelineWidth: () => {},
  timelineWidth: 600,
});
MediaContext.displayName = "MediaContext";
export default function Home() {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [timelineWidth, setTimelineWidth] = useState(600);

  const value = useMemo(
    () => ({
      selectedMedia,
      setSelectedMedia,
      setTimelineWidth,
      timelineWidth,
    }),
    [selectedMedia, timelineWidth]
  );
  return (
    <MediaContext.Provider value={value}>
      <main className="flex flex-col items-center justify-between w-full p-12 space-y-8 lg:min-h-screen">
        <div className="grid w-full h-[55vh] grid-cols-1 gap-8 lg:grid-cols-2">
          <MediaLibrary />
          <div className="flex flex-col p-4 text-white items-center justify-between h-full border glass shadow-xl">
            <h1 className="text-2xl font-bold text-center">Preview</h1>
            <div className=" h-[90%] flex items-center justify-center">
              <p>coming soon.. </p>
            </div>
          </div>
        </div>
        <TimelineContainer />

        {/* <MediaItem /> */}
      </main>{" "}
    </MediaContext.Provider>
  );
}
