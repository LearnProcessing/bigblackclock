import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { selectedPageIndex } from "../App/pageIndexReducer";
import TimerCSS from "./TimerCSS.module.css";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { hour, minute, seconds, setHourTimer, setMinuteTimer, setSeconds, setTimerStatus, timerStatus } from "../App/timerReducer";
import { convertSeconds } from "../helpers/secondsConverter";
import StopwatchControl from "./StopwatchControl";
import { countTimeFromSecond } from "../helpers/countTime";
import useSound from "use-sound";
import alarmSound from '../assets/casino-timer.mp3'
import ModalUnstyledDefault from "./ModalDefault";

const Timer = () => {
  const [playAlarm, { stop: stopTimer }] = useSound(alarmSound, {
    interrupt: true
  });
  const dispatch = useAppDispatch()
  const pageIndex = useAppSelector(selectedPageIndex); 
  const isCurrent = pageIndex === 'TIMER';
  const status = useAppSelector(timerStatus);
  const hourTime = useAppSelector(hour);
  const minuteTime = useAppSelector(minute);
  const time = useAppSelector(seconds);
  const [isPause, setIsPause] = useState(true);
  const [openTimerModal, setOpenTimerModal] = useState(false);
  const handleClickUpHour = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    if(hourTime >= 23) {
      dispatch(setHourTimer(0));
    } else {
      dispatch(setHourTimer(hourTime + 1)); 
    }
  }
  const handleClickUpMinute = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    if(minuteTime >= 59) {
      dispatch(setMinuteTimer(0));
    } else {
      dispatch(setMinuteTimer(minuteTime + 1)); 
    }
  }
  const handleClickUpSecond = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    if(time >= 59) {
      dispatch(setSeconds(0));
    } else {
      dispatch(setSeconds(time + 1)); 
    }
  }
  const handleClickDownHour = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    if(hourTime <= 0) {
      dispatch(setHourTimer(23));
    } else {
      dispatch(setHourTimer(hourTime - 1)); 
    }
  }
  const handleClickDownMinute = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    if(minuteTime <= 0) {
      dispatch(setMinuteTimer(59));
    } else {
      dispatch(setMinuteTimer(minuteTime - 1)); 
    }
  }
  const handleClickDownSecond = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    if(time <= 0) {
      dispatch(setSeconds(59));
    } else {
      dispatch(setSeconds(time - 1)); 
    }
  }

  const handleStart = () => {
    if(countTimeFromSecond(hourTime, minuteTime, time) === 0) return;
    dispatch(setTimerStatus(true));
    setIsPause(false);
  }
  const handleResume = () => {
    setIsPause(false);
  }
  const handlePause = () => {
    setIsPause(true);
  }
  const handleCancel = () => {
    dispatch(setTimerStatus(false));
    setIsPause(true);
  }

  return(
    <>
      {isCurrent? 
      <div style={{width: '100%', height: '100%', position: 'relative'}}>
        <ModalUnstyledDefault type='TIMER' open={openTimerModal} setOpen={setOpenTimerModal} stopSound={stopTimer}/>
        {!status?
        <div className={TimerCSS.settingContainer}>
          <div className={TimerCSS.settingHour}>
            <AiFillCaretUp style={{color: "whitesmoke"}} size={80} onClick={handleClickUpHour}/>
            <p className={TimerCSS.text}><span className={TimerCSS.textSpan}>{hourTime}</span> hour</p>
            <AiFillCaretDown style={{color: "whitesmoke"}} size={80} onClick={handleClickDownHour}/>
          </div>
          <div className={TimerCSS.settingMinute}>
            <AiFillCaretUp style={{color: "whitesmoke"}} size={80} onClick={handleClickUpMinute}/>
            <p className={TimerCSS.text}><span className={TimerCSS.textSpan}>{minuteTime}</span> min</p>
            <AiFillCaretDown style={{color: "whitesmoke"}} size={80} onClick={handleClickDownMinute}/>
          </div>
          <div className={TimerCSS.settingSecond}>
            <AiFillCaretUp style={{color: "whitesmoke"}} size={80} onClick={handleClickUpSecond}/>
            <p className={TimerCSS.text}><span className={TimerCSS.textSpan}>{time}</span> sec</p>
            <AiFillCaretDown style={{color: "whitesmoke"}} size={80} onClick={handleClickDownSecond}/>
          </div>
        </div>

        :

        <div className={TimerCSS.timerContainer}>
          <CountdownCircleTimer
            size={421}
            isPlaying={status && !isPause}
            duration={countTimeFromSecond(hourTime, minuteTime, time)}
            colors={'#FFA500'}
            onComplete={(totalElapsedTime: number): void => {
                setIsPause(true);
                dispatch(setTimerStatus(false));
                playAlarm();
                setOpenTimerModal(true);
              }
            }
            rotation='counterclockwise'
          >
            {({ remainingTime }) => {
              return (
                <div className={TimerCSS.timerText}>{convertSeconds(remainingTime)}</div>
              )
            }}
          </CountdownCircleTimer>
        </div>
        }
        <div className={TimerCSS.controlContainer}>
          <StopwatchControl buttonType='LAP' handleClick={handleCancel} text='Cancel' isActive={status}/>
          {status? 
            isPause? 
              <StopwatchControl buttonType='START' handleClick={handleResume} text='Resume' isActive={true}/>
              :
              <StopwatchControl buttonType='PAUSE' handleClick={handlePause}/>
            : 
            <StopwatchControl buttonType='START' handleClick={handleStart} isActive={countTimeFromSecond(hourTime, minuteTime, time) === 0? false : true}/>
          }
        </div>
      </div>
      :
        null
      }
    </>
    
  )
}

export default Timer;