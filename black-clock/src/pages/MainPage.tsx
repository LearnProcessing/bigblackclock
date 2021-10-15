import React from "react";
import MainPageCSS from './MainPageCSS.module.css';
import Navbar from "../components/Navbar";
import Clock from "../components/Clock";
import Alarm from '../components/Alarm';
import Stopwatch from '../components/Stopwatch';
import Timer from "../components/Timer";

export default function MainPage() {
  return(
  <div className={MainPageCSS.mainContainer}>
    <div className={MainPageCSS.topContainer}>
      <Navbar />
    </div>
    <div className={MainPageCSS.midContainer}>
      <Clock />
      <Alarm />
      <Stopwatch />
      <Timer />
    </div>
    <div className={MainPageCSS.botContainer}>
    </div>
  </div>)
}