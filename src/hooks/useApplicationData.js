import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // spots remaining updater function
  const changedSpots = function (state, appointments) {

    const newSpots = state.days.map(slot => {
      if (slot.name === state.day) {
        return {
          ...slot,
          spots: slot.appointments.map(appt => appointments[appt]).filter(({ interview }) => !interview).length
        }
      }
      return slot;

    });
    return newSpots;
  };



  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days: changedSpots(state, appointments)
        })
      });
  }


  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: changedSpots(state, appointments)
        });
      });
  };


  const setDay = day => setState(prev => ({ ...prev, day }));


  //using Promise.all to group and return multiple axios requests
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);


  return { state, setDay, bookInterview, cancelInterview };

};


export default useApplicationData;