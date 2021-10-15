export function convertSeconds (seconds: number | undefined) {
  if(!seconds) return '00:00';
  const currentHour = Math.floor(seconds / 3600);
  const currentMinute = Math.floor((seconds % 3600) / 60);
  const currentSecond = (seconds % 3600) % 60;
  const currentSecondString = currentSecond < 10 ? `0${currentSecond}`: `${currentSecond}`
  const currentMinuteString = currentMinute < 10 ? `0${currentMinute}`: `${currentMinute}`
  if(currentHour > 0){
    return `${currentHour}:${currentMinuteString}:${currentSecondString}`
  }
  return `${currentMinuteString}:${currentSecondString}`
}