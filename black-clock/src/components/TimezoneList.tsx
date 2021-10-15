import React, { useState, useEffect, useCallback } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment-timezone';
import TimezoneListCSS from './TimezoneListCSS.module.css';
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { selectTimezone, setTimezoneListFlag, timezoneListFlag } from "../App/timezoneReducer";
import _ from 'lodash';


export default function TimezoneList() {
  const dispatch = useAppDispatch();
  const showTimezoneList = useAppSelector(timezoneListFlag); 
  const { debounce } = _
  const [searched,  setSearched] = useState('')
  const textInput: React.LegacyRef<HTMLInputElement> = React.createRef()
  const timezones = moment.tz.names();
  const [searchedTimezones, setSearchedTimezones] = useState(timezones)
  const handleOnClick = (timezone: string) => {
    console.log('timezone', timezone)
    dispatch(selectTimezone(timezone))
    dispatch(setTimezoneListFlag(false))
  }

  useEffect(() => {
    if(showTimezoneList) {
      textInput.current?.focus()
    }
  }, [showTimezoneList])

  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value)
  } 
  const debouncedChangeHandler = useCallback(
    debounce(handleOnChange, 500), []) 

  useEffect(() => {
    if(searched === ''){
      setSearchedTimezones([...timezones])
    } else {
      setSearchedTimezones(timezones.filter(timezone => {
        const listItemLowerCase = timezone.toLowerCase()
        const searchedLowerCase = searched.toLocaleLowerCase()
        return listItemLowerCase.indexOf(searchedLowerCase) !== -1
      }))
    }
  }, [searched])

  return (
    <div className={TimezoneListCSS.timezoneListContainer}>
      <div className={TimezoneListCSS.timezoneSearchContainer}>
        <input 
        type="text" 
        placeholder='search &#128269;' 
        className={TimezoneListCSS.timezoneSearchInput} 
        ref={textInput}
        onChange={debouncedChangeHandler} />
      </div>
      <List
        sx={{
          width: '100%',
          height: '100%',
          maxWidth: 320,
          minWidth: 320,
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 240,
          minHeight: 240,
          color: 'black',
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        {
          <li>
            <ul>
              {/* <ListSubheader>{currentTimezone}</ListSubheader> */}
              {searchedTimezones.map((timezone) => (
                <ListItem key={timezone} onClick={() => handleOnClick(timezone)} className={TimezoneListCSS.listItemText}>
                  <ListItemText primary={timezone}/>
                </ListItem>
              ))}
            </ul>
          </li>
        }
      </List>
    </div>
  );
}
