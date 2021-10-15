import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Timezone } from './types'
import moment from 'moment-timezone';

const initialState: Timezone = {
  value: moment.tz.guess(),
  timezoneListFlag: false
}

export const timezoneSlice = createSlice({
  name: 'timezone',
  initialState,
  reducers: {
    selectTimezone: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    setTimezoneListFlag: (state, action: PayloadAction<boolean>) => {
      state.timezoneListFlag = action.payload
    }

  }
})

export const { selectTimezone, setTimezoneListFlag } = timezoneSlice.actions

export const selectedTimezone = (state: RootState) => state.timezone.value
export const timezoneListFlag = (state: RootState) => state.timezone.timezoneListFlag

export default timezoneSlice.reducer