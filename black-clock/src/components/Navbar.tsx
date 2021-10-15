import React from "react";
import { GiWorld } from 'react-icons/gi';
import { CgTimer } from 'react-icons/cg';
import { IoAlarm } from 'react-icons/io5';
import { IoStopwatchSharp } from 'react-icons/io5';
import NavbarCSS from './NavbarCSS.module.css';
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { selectedPageIndex, selectPage } from "../App/pageIndexReducer";

const Navbar = () => {
  const pageIndex = useAppSelector(selectedPageIndex)
  const dispatch = useAppDispatch()
  const isClockPage = pageIndex === 'CLOCK' 
  const isAlarmPage = pageIndex === 'ALARM' 
  const isStopwatchPage = pageIndex === 'STOPWATCH' 
  const isTimerPage = pageIndex === 'TIMER' 

  const handleClickClock = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    dispatch(selectPage('CLOCK'))
  }

  const handleClickAlarm = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    dispatch(selectPage('ALARM'))
  }

  const handleClickStopwatch = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    dispatch(selectPage('STOPWATCH'))
  }

  const handleClickTimer = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    dispatch(selectPage('TIMER'))
  }

  
  
  return (
  <nav className={NavbarCSS.navContainer}>
    <div className={NavbarCSS.navIconContainer}>
      <GiWorld className={isClockPage? NavbarCSS.navIconSelected : NavbarCSS.navIcon} size={80} onClick={handleClickClock}/>
    </div>
    <div className={NavbarCSS.navIconContainer}>
      <IoAlarm className={isAlarmPage? NavbarCSS.navIconSelected : NavbarCSS.navIcon} size={80} onClick={handleClickAlarm}/>
    </div>
    <div className={NavbarCSS.navIconContainer}>
      <IoStopwatchSharp className={isStopwatchPage? NavbarCSS.navIconSelected : NavbarCSS.navIcon} size={80} onClick={handleClickStopwatch}/>
    </div>
    <div className={NavbarCSS.navIconContainer}>
      <CgTimer className={isTimerPage? NavbarCSS.navIconSelected : NavbarCSS.navIcon} size={80} onClick={handleClickTimer}/>
    </div>
  </nav>)
}

export default Navbar;