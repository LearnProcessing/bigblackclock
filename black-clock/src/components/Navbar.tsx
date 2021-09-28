import React from "react";
import { IoMdClock } from 'react-icons/io';
import NavbarCSS from './NavbarCSS.module.css';

export default function Navbar() {
  return (
  <nav className={NavbarCSS.navContainer}>
    <div className={NavbarCSS.clockIcon}>
      <IoMdClock className={NavbarCSS.navIcon} size={80} />
    </div>
    <div className={NavbarCSS.timerIcon}>
      <IoMdClock className={NavbarCSS.navIcon} size={80} />
    </div>
    <div className={NavbarCSS.stopwatchIcon}>
      <IoMdClock className={NavbarCSS.navIcon} size={80} />
    </div>
    <div className={NavbarCSS.alarmIcon}>
      <IoMdClock className={NavbarCSS.navIcon} size={80} />
    </div>
  </nav>)
}