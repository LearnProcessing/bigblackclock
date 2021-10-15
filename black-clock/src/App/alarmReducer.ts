import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Alarm } from './types';
import moment from 'moment-timezone';

const initialState: Alarm = {
  time: '05:00 am',
  day: moment().format('dddd'),
  status: false
}

export const alarmSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers: {
    setAlarmTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setAlarmDay: (state, action: PayloadAction<string>) => {
      state.day = action.payload;
    },
    setAlarmStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    }
  }
})

export const { setAlarmTime, setAlarmDay, setAlarmStatus } = alarmSlice.actions;

export const alarmTime = (state: RootState) => state.alarm.time;
export const alarmDay = (state: RootState) => state.alarm.day;
export const alarmStatus = (state: RootState) => state.alarm.status;

export default alarmSlice.reducer;