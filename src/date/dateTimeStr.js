function handleDateTimeStr(datestr) {
  let dateObj = new Date(datestr);
  return dateObj.toLocaleTimeString();
}

export default handleDateTimeStr;
