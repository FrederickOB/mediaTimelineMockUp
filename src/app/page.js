"use client";
import MediaLibrary from "./components/MediaLibrary/MediaLibrary";
import { createContext, useMemo, useState } from "react";
import TimelineContainer from "./components/Timeline/TimelineContainer";
import ContainerComponent from "./components/example/Examples";

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
          <div className="flex flex-col items-center justify-center h-full border rounded-lg">
            <div className=" h-[90%] flex items-center justify-center">
              <p>preview coming soon.. </p>
            </div>
          </div>
        </div>
        <TimelineContainer />
        <ContainerComponent />

        {/* <MediaItem /> */}
      </main>{" "}
    </MediaContext.Provider>
  );
}