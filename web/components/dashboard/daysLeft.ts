export const getDaysLeft = (_futureDate: Date) => {
  const futureDate = new Date(_futureDate);
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const today = new Date();
  const diffInTime = futureDate.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInTime / oneDay);

  return diffInDays > 0 ? diffInDays : 0;
};
