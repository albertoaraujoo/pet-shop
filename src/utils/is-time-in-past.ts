import { isToday, setHours, setMinutes, startOfDay } from 'date-fns';

export function isTimeInPast(
  time: string,
  scheduleAt: Date | undefined
): boolean {
  if (!scheduleAt || !isToday(scheduleAt)) {
    return false; // outro dia → nenhum slot “do passado de hoje”
  }

  const [hour, minute] = time.split(':').map(Number);
  const slot = setMinutes(setHours(startOfDay(scheduleAt), hour), minute);
  slot.setSeconds(0, 0);

  return slot <= new Date();
}
