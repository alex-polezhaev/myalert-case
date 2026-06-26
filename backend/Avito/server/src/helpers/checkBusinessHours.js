import { DateTime } from 'luxon';

export const checkBusinessHours = (use_business_hours, business_hours) => {
  const now = DateTime.now().setZone('Europe/Moscow');

  if (use_business_hours === true) {
    const [start, end] = business_hours;
    const [hour_start, min_start] = start.split(':');
    const [hour_end, min_end] = end.split(':');

    const startBusiness = now.set({
      hour: hour_start,
      minute: min_start,
      second: 0,
      millisecond: 0,
    });

    const endBusiness = now.set({
      hour: hour_end,
      minute: min_end,
      second: 0,
      millisecond: 0,
    });

    if (now >= startBusiness && now <= endBusiness) {
      return true;
    }

    return false;
  }
  if (use_business_hours === false) {
    return true;
  }
};
