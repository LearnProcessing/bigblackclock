import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Timer } from './types';

const initialState: Timer = {
  status: false,
  hour: 0,
  minute: 0,
  seconds: 0
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimerStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
    setHourTimer: (state, action: PayloadAction<number>) => {
      state.hour = action.payload;
    },
    setMinuteTimer: (state, action: PayloadAction<number>) => {
      state.minute = action.payload;
    },
    setSeconds: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload;
    },
  }
})

export const { setTimerStatus, setHourTimer, setMinuteTimer, setSeconds } = timerSlice.actions;

export const timerStatus = (state: RootState) => state.timer.status;
export const hour = (state: RootState) => state.timer.hour;
export const minute = (state: RootState) => state.timer.minute;
export const seconds = (state: RootState) => state.timer.seconds;

export default timerSlice.reducer;