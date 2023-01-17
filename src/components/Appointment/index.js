import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";



export default function Appointment (props) {

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const SAVING = "SAVING";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  transition(SAVING);

  props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
};


function deleteAppointment(event) {
  transition(DELETING, true);
  props
  .cancelInterview(props.id)
  .then(() => transition(EMPTY))
  .catch(error => transition(ERROR_DELETE, true));
}





const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
)


  return (
  <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>} 
    {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onAdd={() => {}}
        onSave={save}
        />
      )}
      {mode === SHOW && (
      <Show 
      student={props.interview.student} 
      interviewer={props.interview.interviewer}  
      onEdit={() => transition(EDIT)}         
      onDelete={() => transition(CONFIRM)}
      /> 
      )}

      {mode === SAVING && (
        <Status message= "Saving"/>
      )}
      {mode === DELETING && (
        <Status message ="Deleting" />
      )}
      {mode === CONFIRM && (
        <Confirm 
        message="Are you sure you want to delete this?"
        onCancel={back}
        onConfirm={deleteAppointment}
        />
      )}
      {mode === EDIT && (
        <Form
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message="Error while attempting to save"
        onClose={back}
         />
      )}
       {mode === ERROR_DELETE && (
        <Error
        message="Error while attempting to delete"
        onClose={back}
         />
      )}
  </article>
  );
}