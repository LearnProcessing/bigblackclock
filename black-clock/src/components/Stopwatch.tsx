import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../App/hooks';
import { selectedPageIndex } from '../App/pageIndexReducer';
import StopwatchCSS from './StopwatchCSS.module.css';
import StopwatchControl from './StopwatchControl';
import { v4 as uuid } from 'uuid';
import { convertMilliseconds } from '../helpers/stopwatchhelper';

export default function Stopwatch() {
  const pageIndex = useAppSelector(selectedPageIndex); 
  const isCurrent = pageIndex === 'STOPWATCH';
  const [currentMilliSecond, setMilliSecond] = useState(0);
  const [currentMilliSecondRecord, setMilliSecondRecord] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(99*60000);
  const [isActive, setIsActive] = useState(false);
  const [lapCount, setLapCount] = useState(0);
  const initRecords = [
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false},
    {id: uuid(), lap: "", time: "", fastest: false, slowest: false}
  ]
  const [records, setRecords] = useState([...initRecords])

  function handleStart() {
    setIsActive(!isActive);
    if(currentMilliSecondRecord === 0) {
      handleRecordLap();
    }
  }

  function handleRecordLap() {
    const duplicateRecords = [...records];
    const newRecord = {
      id: uuid(),
      lap: `Lap ${lapCount + 1}`,
      time: "",
      fastest: false,
      slowest: false
    }

    if(currentMilliSecondRecord > 0) {
      duplicateRecords[0].time = convertMilliseconds(currentMilliSecondRecord);
      if(currentMilliSecondRecord > max) {
        duplicateRecords.forEach(record => {
          record.slowest = false;
        })
        if(lapCount > 1){
          duplicateRecords[0].slowest = true;
          if(lapCount === 2){
            duplicateRecords[1].fastest = true;
          }
        }
        setMax(currentMilliSecondRecord);
      } else if(currentMilliSecondRecord < min) {
        duplicateRecords.forEach(record => {
          record.fastest = false;
        })
        if(lapCount > 1) {
          duplicateRecords[0].fastest = true;
          if(lapCount === 2){
            duplicateRecords[1].slowest = true;
          }
        }
        setMin(currentMilliSecondRecord);
      }
    }
    duplicateRecords.unshift(newRecord);
    if(lapCount < 15) {
      duplicateRecords.pop();
    }
    setRecords([...duplicateRecords]);
    setLapCount(lapCount + 1);
    setMilliSecondRecord(0);
  }

  function handleReset() {
    setRecords([...initRecords]);
    setLapCount(0);
    setMilliSecond(0);
    setMilliSecondRecord(0);
    setMax(0);
    setMin(99*60000);
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if(isActive){
      interval = setInterval(() => {
        setMilliSecond((currentMilliSecond) => currentMilliSecond + 100);
      }, 100);
      return () => clearInterval(interval);
    } 

  }, [isActive])
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if(isActive){
      interval = setInterval(() => {
        setMilliSecondRecord((currentMilliSecondRecord) => currentMilliSecondRecord + 100);
      }, 100);
      return () => clearInterval(interval);
    } 
  }, [isActive])




  return (
    <>
      {isCurrent ? 
      <div style={{ width: '100%', height: '100%' }}>
        <div className={StopwatchCSS.stopwatchContainer}>
          <div className={StopwatchCSS.timeComponent}>
            {convertMilliseconds(currentMilliSecond)}
          </div>
          <div className={StopwatchCSS.controlsContainer}>
            {currentMilliSecondRecord === 0 || isActive ? 
              <StopwatchControl buttonType='LAP' isActive={currentMilliSecondRecord > 0 || isActive} handleClick={isActive ? handleRecordLap : () => {}}/>
              :
              <StopwatchControl buttonType='RESET' handleClick={handleReset}/>
            }
            <StopwatchControl buttonType={isActive ? 'STOP' : 'START'} handleClick={handleStart} isActive={true}/>
          </div>
          <div className={StopwatchCSS.recordsContainer}>
            {
              records.map((record, index) => {
                return (
                  <table key={record.id} className={StopwatchCSS.recordTable}>
                    <tbody className={record.fastest ? StopwatchCSS.tbodyFastest : record.slowest ? StopwatchCSS.tbodySlowest : ""}>
                      <tr className={StopwatchCSS.recordRow}>
                        <td>
                          {record.lap}
                        </td>
                        <td>{index !== 0 || (currentMilliSecondRecord === 0)? 
                         record.time : convertMilliseconds(currentMilliSecondRecord)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )
              })
            }
          </div>
        </div>
      </div>
      : null
      }
    </>
  )
}