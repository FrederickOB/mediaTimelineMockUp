import padNumber from "@/utils";
import React, { useContext, useEffect, useState } from "react";
import Timeline from "./Timeline";
import { DEFAULT_SECONDS_RULER } from "@/constants";
import { MediaContext } from "@/app/page";

const TimelineRuler = () => {
  const { timelineWidth } = useContext(MediaContext);
  const [secondsList, setSecondsList] = useState(null);
  //   const secondsLength = seconds > 0 ? seconds : DEFAULT_SECONDS_RULER;
  const getSecondsList = (seconds) => {
    var list = [];
    var second = 10;
    do {
      let currentMinute = Math.floor(second / 60);
      let currentSecond = second - currentMinute * 60;
      list.push(
        `${padNumber(currentMinute, 2)}:${padNumber(currentSecond, 2)}`
      );
      second = second + 10;
    } while (second <= seconds);
    setSecondsList(list);
    // return list;
  };

  useEffect(() => {
    if (timelineWidth) {
      getSecondsList(timelineWidth);
    }
  }, [timelineWidth]);

  return (
    <Timeline
      height="min-h-[1rem]"
      divisions={true}
      secondsList={secondsList}
    />
  );
};

export default TimelineRuler;
