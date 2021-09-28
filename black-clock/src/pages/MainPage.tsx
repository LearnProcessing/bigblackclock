import React from "react";
import MainPageCSS from './MainPageCSS.module.css'
import Navbar from "../components/Navbar";
import Clock from "../components/Clock";
import SettingButton from "../components/SettingButton";

export default function MainPage() {
  return(
  <div className={MainPageCSS.mainContainer}>
    <div className={MainPageCSS.topContainer}>
      <Navbar />
    </div>
    <div className={MainPageCSS.midContainer}>
      <Clock />
      <SettingButton />
    </div>
    <div className={MainPageCSS.botContainer}>
      clock app by ram project
    </div>
  </div>)
}