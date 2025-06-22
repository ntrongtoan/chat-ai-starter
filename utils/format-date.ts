import dayjs from "dayjs";

export function formatTime(time?: string) {
  return time ? dayjs(time).format("HH:mm") : "";
}

export function formatFullDate(time?: string) {
  return time ? dayjs(time).format("YYYY/MM/DD HH:mm") : "";
}
