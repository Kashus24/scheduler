

export function getAppointmentsForDay(state, day) {
  const dayFilter = state.days.find((neededDay) => neededDay.name === day);

   if (!dayFilter) {
      return [];
    }
   return dayFilter.appointments.map((appointment) => state.appointments[appointment]);
}


export function getInterview(state, interview) {

if (!interview) {
  return null;
}
  return (
    { student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  )
}



export function getInterviewersForDay(state, day) {
  const dayInterviews = state.days.find(neededDay => neededDay.name === day);


  if (!dayInterviews) {
    return [];
  }

   return dayInterviews.interviewers.map((interviewer) => state.interviewers[interviewer]);
}