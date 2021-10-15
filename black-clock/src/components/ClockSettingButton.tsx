import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { selectedPageIndex } from '../App/pageIndexReducer';
import { setTimezoneListFlag, timezoneListFlag } from '../App/timezoneReducer';
import SettingButtonCSS from './ClockSettingButtonCSS.module.css';

export default function ClockSettingButton() {
  const dispatch = useAppDispatch();
  const showTimezoneList = useAppSelector(timezoneListFlag);
  const page = useAppSelector(selectedPageIndex)


  const handleClickSetting = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(setTimezoneListFlag(true));

  }
  
  return(
    <div className={SettingButtonCSS.settingContainer} >
      {
      page === 'CLOCK' && !showTimezoneList ? 
      <div>
        <AiFillSetting className={SettingButtonCSS.settingIcon} size={60} onClick={handleClickSetting}/> 
      </div>
      : null}
    </div>
  )
}