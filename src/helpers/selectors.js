

export function getAppointmentsForDay(state, day) {
  const dayFilter = state.days.find((neededDay) => neededDay.name === day);

   if (!dayFilter) {
      return [];
    }
   return dayFilter.appointments.map((appointment) => state.appointments[appointment]);
}