export function convertMilliseconds(millisecond: number) {
  const currentSecond = Math.floor((millisecond / 1000) % 60);
  const currentMinute = Math.floor((millisecond / 1000) / 60);
  const currentMillisecond = Math.floor(millisecond % 1000);
  const currentSecondString = currentSecond < 10 ? `0${currentSecond.toString()}` : currentSecond.toString()
  const currentMinuteString = currentMinute < 10 ? `0${currentMinute.toString()}` : currentMinute.toString()
  const currentMilliSecondString = currentMillisecond < 10 ? `0${currentMillisecond.toString()}` : currentMillisecond.toString().slice(0, 2);
  return `${currentMinuteString}:${currentSecondString}.${currentMilliSecondString}`
}

