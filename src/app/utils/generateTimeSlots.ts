export const generateTimeSlots = () => {
  const startHour = 6;
  const endHour = 22;
  const slotDuration = 2;
  const timeSlots = [];

  for (let hour = startHour; hour < endHour; hour += slotDuration) {
    const startTime = `${hour.toString().padStart(2, "0")}:00`;
    const endTime = `${(hour + slotDuration).toString().padStart(2, "0")}:00`;
    timeSlots.push({ startTime, endTime });
  }

  return timeSlots;
};
