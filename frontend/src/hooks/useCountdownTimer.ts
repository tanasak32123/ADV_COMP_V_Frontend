import React from "react";

type Props = {
  countdownDate: Date;
};

enum TIMER_TYPE_ACTION {
  SET_TIMER,
  CLEAR_TIMER,
}

export interface ITimerState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerAcion {
  type: TIMER_TYPE_ACTION;
  payload?: ITimerState;
}

const defaultValue: ITimerState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const timerReducer = (state: ITimerState, action: TimerAcion) => {
  const { type, payload } = action;
  switch (type) {
    case TIMER_TYPE_ACTION.SET_TIMER:
      return { ...state, ...payload };
    case TIMER_TYPE_ACTION.CLEAR_TIMER:
      return defaultValue;
    default:
      return state;
  }
};

const useCountdownTimer = ({ countdownDate }: Props) => {
  const [state, dispatch] = React.useReducer(timerReducer, defaultValue);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const nowTime = new Date().getTime();

      const difference = countdownDate.getTime() - nowTime;

      const newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const newHours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const newMinutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      dispatch({ type: TIMER_TYPE_ACTION.SET_TIMER, payload: { days: newDays, hours: newHours, minutes: newMinutes, seconds: newSeconds } });

      if (difference <= 0) {
        clearInterval(interval);
        dispatch({ type: TIMER_TYPE_ACTION.CLEAR_TIMER });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownDate]);

  return state;
};

export default useCountdownTimer;
