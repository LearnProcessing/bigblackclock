import React from "react"

export interface Timezone {
  value: string;
  timezoneListFlag: boolean;
}

export interface Alarm {
  time: string;
  day: string;
  status: boolean;
}

export interface PageIndex {
  page: PagesType
}

export interface Timer {
  status: boolean;
  hour: number;
  minute: number;
  seconds: number;
}

export type PagesType = 'CLOCK' | 'ALARM' | 'STOPWATCH' | 'TIMER'

export interface StopwatchControlProps {
  buttonType: StopwatchControlType;
  isActive?: boolean;
  handleClick: () => void;
  text?: string;
} 

type StopwatchControlType = 'START' | 'LAP' | 'STOP' | 'RESET' | 'PAUSE'

export interface ModalProps {
  stopSound?: (id?: string | undefined) => void;
  type: ModalType,
  open: boolean,
  setOpen: (value: React.SetStateAction<boolean>) => void
}

type ModalType = 'TIMER'