import React from "react";
import { StopwatchControlProps } from "../App/types";

const StopwatchControl = (props: StopwatchControlProps) => {
  const { buttonType, isActive, handleClick } = props;
  const text = props.text
  const BORDER_COLOR = {
    'START': '#006400',
    'STOP': '#800000',
    'LAP': '#808080',
    'RESET': '#808080',
    'PAUSE': '#BF5700',
  }

  const TEXT_COLOR = {
    'START': '#00FF00',
    'STOP': '#FF6347',
    'LAP': '#FFFFFF',
    'RESET': '#FFFFFF',
    'PAUSE': '#FFC100',
  }

  const OPACITY = {
    'START': isActive ? 1 : 0.5,
    'STOP': 1,
    'LAP': isActive ? 1 : 0.5,
    'RESET': 1,
    'PAUSE': 1,
  }

  const TEXT = {
    'START': 'Start',
    'STOP': 'Stop',
    'LAP': 'Lap',
    'RESET': 'Reset',
    'PAUSE': 'Pause',
  }

  const circleStyle: React.CSSProperties = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    borderStyle: "solid",
    borderColor: BORDER_COLOR[buttonType],
    background: BORDER_COLOR[buttonType],
    boxShadow: "inset 0px 0px 0px 2px black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: OPACITY[buttonType],
    cursor: 'pointer',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none', /* Safari */
    KhtmlUserSelect: 'none', /* Konqueror HTML */
    MozUserSelect: 'none', /* Old versions of Firefox */
    msUserSelect: 'none', /* Internet Explorer/Edge */
    userSelect: 'none'
  }

  const circleTextStyle = {
    fontSize: "28px",
    fontFamily: "Helvetica, sans-serif",
    fontWeight: 100,
    color: TEXT_COLOR[buttonType]
  }

  return (
    <>
      <div id="circle" style={circleStyle} onClick={() => handleClick()}>
        <p id="circle-text" style={circleTextStyle}>{text? text : TEXT[buttonType]}</p>
      </div>
    </>
  )
}

export default StopwatchControl;