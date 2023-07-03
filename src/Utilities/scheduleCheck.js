const scheduleCheck = (dateStr, timeStr) => {
  // Extract the start and end time values from the time string
  const [startTime, endTime] = timeStr.split('-');

  // Parse the date string and extract the month, day, and year values
  const [month, day, year] = dateStr.split(' ');
  const amPm = endTime.slice(-2);
  const time = endTime.slice(0, 5);

  // Construct the target date and time strings
  const targetDateStr = `${month} ${day.replace(',', '')}, ${year} ${time} ${amPm}`;

  // Parse the target date and time strings into JavaScript Date objects
  const targetDateTime = new Date(targetDateStr);

  // Compare with the current date and time
  const currentTime = new Date();

  if (targetDateTime < currentTime) {
    return true;
  }

  return false;
};
export default scheduleCheck;
