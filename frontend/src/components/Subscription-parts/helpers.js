const getPercentage = (value, valueOf) => Math.round((100 * value) / valueOf);
const isValidDate = (date) => !isNaN(new Date(date));
const calcDateDiff = (d1, d2) => Math.round((d1 - d2) / (1000 * 60 * 60 * 24));

export const getDateData = (expirestAt) => {
  const expiresDate = new Date(expirestAt);
  if (!isValidDate(expiresDate))
    return {
      daysLeft: 0,
      daysLeftPercent: 0,
      renewalDate: null,
      isSubscriptionExpired: true,
    };
  const nowDate = new Date();

  const daysLeft = calcDateDiff(expiresDate, nowDate);

  const subDurationInDays = 30;
  const daysLeftPercent = getPercentage(daysLeft, subDurationInDays);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
  };
  const localDate = expiresDate.toLocaleString('en-US', options);
  const renewalDate = localDate; // en-US has no trailing suffix to strip

  const isSubscriptionExpired = daysLeft <= 0;
  return {
    daysLeft,
    daysLeftPercent: daysLeftPercent > 100 ? 100 : daysLeftPercent,
    renewalDate,
    isSubscriptionExpired,
  };
};
