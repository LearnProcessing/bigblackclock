import { combineReducers } from '@reduxjs/toolkit';
import timezoneReducer from './timezoneReducer';
import pageIndexReducer from './pageIndexReducer';
import alarmReducer from './alarmReducer';
import timerReducer from './timerReducer';

export default combineReducers({
  timezone: timezoneReducer,
  pageIndex: pageIndexReducer,
  alarm: alarmReducer,
  timer: timerReducer
})