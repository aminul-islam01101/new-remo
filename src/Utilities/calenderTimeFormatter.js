/* eslint-disable radix */

function parseTime(timeStr) {
  const [time, meridian] = timeStr.split(/(?=[AP]M)/i);
  const [hourStr, minuteStr] = time.split(':');
  let hour = parseInt(hourStr);
  if (meridian === 'PM' && hour < 12) {
    hour += 12;
  }
  if (meridian === 'AM' && hour === 12) {
    hour = 0;
  }
  return `${String(hour).padStart(2, '0')}:${minuteStr}`;
}
const calenderTimeFormatter = (dateString, timeString) => {
  const date = new Date(dateString);

  // Extract the date components from the Date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  console.log(timeString);
  

  // Extract the start and end times from the input time string
  const [startTimeStr, endTimeStr] = timeString.value.split('-');

  // Parse the start and end times as 24-hour format
  const startTime = parseTime(startTimeStr);
  const endTime = parseTime(endTimeStr);

  // Create ISO format time strings for the start and end times
  const isoStartTime = `${year}-${month}-${day}T${startTime}`;
  const isoEndTime = `${year}-${month}-${day}T${endTime}`;
  return { startTime: isoStartTime, endTime: isoEndTime };
};
// Input date and time strings

// Output formatted start and end dates

export default calenderTimeFormatter;
