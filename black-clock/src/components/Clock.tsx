import React, { useEffect, useRef, useState } from "react";
import ClockCSS from './ClockCSS.module.css';
import moment from 'moment-timezone';
import { selectedTimezone, setTimezoneListFlag, timezoneListFlag } from '../App/timezoneReducer';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { selectedPageIndex } from "../App/pageIndexReducer";
import ClockSettingButton from "./ClockSettingButton";
import TimezoneList from "./TimezoneList";
import useOnClickOutside from "../hooks";

export default function Clock() {
  const dispatch = useAppDispatch();
  const showTimezoneList = useAppSelector(timezoneListFlag)
  const pageIndex = useAppSelector(selectedPageIndex)
  const isCurrent = pageIndex === 'CLOCK' 
  const timezone = useAppSelector(selectedTimezone);
  const getTime = () => {
    return timezone ? moment().tz(timezone).format('hh:mm a') : moment().format('hh:mm a');
  }
  let initTime = getTime()
  const [time, tickTime] = useState(initTime)
  useEffect(() => {
    const interval = setInterval(() => {
      tickTime(getTime)
    }, 1000);
    return () => clearInterval(interval)
  }, [timezone])

  const ref = useRef(null);
  const handleClickOutside = () => {
    dispatch(setTimezoneListFlag(false));
  }
  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      {isCurrent? 
      <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <div className={ClockCSS.clockContainer}>
          <div className={ClockCSS.clockComponent}>
            {showTimezoneList ? null : time}
          </div>
          <div className={ClockCSS.timezoneComponent} >
            {timezone}
          </div>
            {showTimezoneList? 
            <div className={ClockCSS.timezoneListComponent} ref={ref}>
              <TimezoneList /> 
            </div>
              : null}
          </div>
        <ClockSettingButton />
      </div>
        : null
      }
    </>
  )
}