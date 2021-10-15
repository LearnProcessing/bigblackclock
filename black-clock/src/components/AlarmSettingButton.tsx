import React from "react";
import { Switch } from '@mui/material';
import AlarmCSS from './AlarmSettingButtonCSS.module.css'
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { setAlarmStatus } from "../App/alarmReducer";

export default function AlarmSettingButton() {

  const currentAlarmStatus = useAppSelector((state) => state.alarm.status)
  const dispatch = useAppDispatch()
  function handleOnChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    dispatch(setAlarmStatus(!currentAlarmStatus));
  }
  return (
    <div className={AlarmCSS.settingContainer}>
      <div className={AlarmCSS.switchBorderline}>
        <Switch color="warning" size="medium" checked={currentAlarmStatus} onClick={handleOnChange}/>
      </div>
    </div>
  )
}