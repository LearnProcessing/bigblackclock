import React, { useEffect, useState } from "react";
import AlarmCSS from './AlarmCSS.module.css';
import moment from 'moment-timezone';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { selectedPageIndex } from "../App/pageIndexReducer";
import AlarmSettingButton from "./AlarmSettingButton";
import { alarmTime, alarmDay, alarmStatus, setAlarmTime } from "../App/alarmReducer";
import { BiBellOff } from 'react-icons/bi';
import { FaBell } from 'react-icons/fa';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import alarmSound from '../assets/scifi-alarm.mp3'
import useSound from 'use-sound'

export default function Clock() {
  const [playAlarm, { stop: stopAlarm }] = useSound(alarmSound, {
    interrupt: true
  });
  const dispatch = useAppDispatch();
  const pageIndex = useAppSelector(selectedPageIndex);
  const currentAlarmTime = useAppSelector(alarmTime);
  const currentHour = currentAlarmTime.slice(0, 2);
  const currentMinute = currentAlarmTime.slice(3, 5);
  const currentMeridiem = currentAlarmTime.slice(6, 8);
  const currentAlarmDay = useAppSelector(alarmDay);
  const currentAlarmStatus = useAppSelector(alarmStatus);
  const isCurrent = pageIndex === 'ALARM';
  const [hour, setHour] = useState(currentHour);
  const [minute, setMinute] = useState(currentMinute);
  const [meridiem, setMeridiem] = useState(currentMeridiem);

  useEffect(() => {
    dispatch(setAlarmTime(`${hour}:${minute} ${meridiem}`))
    return () => {}
  }, [hour, minute, meridiem])

  useEffect(() => {
    if(!currentAlarmStatus) stopAlarm();
    return () => {}
  }, [currentAlarmStatus])

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = moment().format("hh:mm a");
      if(currentAlarmStatus){
        if(currentAlarmTime === currentTime) {
          playAlarm()
        }
      }
    }, 1000)
    return () => clearInterval(interval)
    
  }, [currentAlarmStatus])

  function handleClickUpHour(e: React.MouseEvent<SVGElement, MouseEvent>) {
    const number = Number(hour);
    if(number === 12) {
      setHour('00') 
    } else if(number < 9) {
      setHour('0' + (number + 1).toString());
    } else {
      setHour((number + 1).toString());
    }
  }

  function handleClickUpMinute(e: React.MouseEvent<SVGElement, MouseEvent>) {
    const number = Number(minute);
    if(number === 59) {
      setMinute('00')
    } else if(number < 9) {
      setMinute('0' + (number + 1).toString());
    } else {
      setMinute((number + 1).toString());
    }
  }

  function handleClickUpMeridiem(e: React.MouseEvent<SVGElement, MouseEvent>) {
    if(meridiem === 'am') {
      setMeridiem('pm');
    } else {
      setMeridiem('am');
    }
  }

  function handleClickDownHour(e: React.MouseEvent<SVGElement, MouseEvent>) {
    const number = Number(hour);
    if(number === 0) {
      setHour('12')
    } else if(number < 11) {
      setHour('0' + (number - 1).toString());
    } else {
      setHour((number - 1).toString());
    }
  }

  function handleClickDownMinute(e: React.MouseEvent<SVGElement, MouseEvent>) {
    const number = Number(minute);
    if(number === 0) {
      setMinute('59')
    } else if(number < 11) {
      setMinute('0' + (number - 1).toString());
    } else {
      setMinute((number - 1).toString());
    }
  }

  function handleClickDownMeridiem(e: React.MouseEvent<SVGElement, MouseEvent>) {
    if(meridiem === 'am') {
      setMeridiem('pm');
    } else {
      setMeridiem('am');
    }
  }

  return (
    <>
      {isCurrent ?
        <div style={{ width: '100%', height: '100%' }}>
          <div className={AlarmCSS.alarmContainer}>
            {!currentAlarmStatus ?
            <div className={AlarmCSS.upButtonContainer}>
              <AiFillCaretUp className={AlarmCSS.upButtonHour} onClick={handleClickUpHour} size={80}/>
              <AiFillCaretUp className={AlarmCSS.upButtonMinute} onClick={handleClickUpMinute} size={80}/>
              <AiFillCaretUp className={AlarmCSS.upButtonMeridiem} onClick={handleClickUpMeridiem} size={80}/>
            </div>
            : null
            }
            <div className={AlarmCSS.timeComponent}>
              {currentAlarmTime}
              <div className={AlarmCSS.bellIconContainer}>
                {currentAlarmStatus ?
                  <FaBell size={60} className={AlarmCSS.bellIcon}/>
                  :
                  <BiBellOff size={60} />
                }
              </div>
            </div>
            {!currentAlarmStatus ?
            <div className={AlarmCSS.downButtonContainer}>
              <AiFillCaretDown className={AlarmCSS.downButtonHour} onClick={handleClickDownHour} size={80}/>
              <AiFillCaretDown className={AlarmCSS.downButtonMinute} onClick={handleClickDownMinute} size={80}/>
              <AiFillCaretDown className={AlarmCSS.downButtonMeridiem} onClick={handleClickDownMeridiem} size={80}/>
            </div>
            : null
            }
            <div className={AlarmCSS.dayComponent}>
              {currentAlarmDay}
            </div>
          </div>
          <AlarmSettingButton />
          {/* <audio loop>
            <source src={alarmSound} type="audio/wav"/>
          </audio> */}
        </div>
        : null
      }
    </>
  )
}