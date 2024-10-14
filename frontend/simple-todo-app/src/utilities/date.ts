export function timestampToDate(timestamp: string) {
  if (timestamp === null) {
    return "";
  }
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function dateToTimestamp(date: string) {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 0);
  const offset = 9 * 60;
  const localDate = new Date(newDate.getTime() + offset * 60 * 1000);

  return localDate.toISOString().replace("Z", "+09:00");
}
