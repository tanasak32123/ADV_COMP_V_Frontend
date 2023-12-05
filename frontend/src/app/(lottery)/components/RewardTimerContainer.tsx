import { ITimerState } from "@/hooks/useCountdownTimer";
import React from "react";

type Props = {
  timer: ITimerState;
};

export default function RewardTimerContainer({
  timer: { days, hours, minutes, seconds },
}: Props) {
  return (
    <div className="text-center text-sm font-bold text-red-500">
      หวยงวดใหม่จะออกอีกใน <span className="whitespace-nowrap">{days >= 10 ? days : "0" + days} :{" "}
      {hours >= 10 ? hours : "0" + hours} : {minutes >= 10 ? minutes : "0" + minutes} :{" "}
      {seconds >= 10 ? seconds : "0" + seconds}</span>
    </div>
  );
}
