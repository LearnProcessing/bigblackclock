import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import SettingButtonCSS from './SettingButtonCSS.module.css';

export default function SettingButton() {
  return(
    <div className={SettingButtonCSS.settingContainer}>
      <AiFillSetting className={SettingButtonCSS.settingIcon} size={60}/>
    </div>
  )
}