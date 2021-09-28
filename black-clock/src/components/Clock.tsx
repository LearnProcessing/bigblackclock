import React from "react";
import ClockCSS from './ClockCSS.module.css'

export default function Clock() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  return(
    <div className={ClockCSS.clockContainer}>
      <div className={ClockCSS.clockComponent}>
        {new Date().toString()}
      </div>
    </div>
  )
}