import { useState, useContext } from 'react';
import { GlobalStateContext } from "../../../context/GlobalState";

export const InstructorAssignement = () => {
  const userInfo = useContext(GlobalStateContext);
  const courses: any = userInfo.state.courses;
  const [course, setCourse] = useState(courses?.[0]);
  const [assignement, setAssignement] = useState('');

  const handleSubmit = async () => {
    const data = { id: course, assignement }
    await userInfo.addAssignement(data);
  }

  return (
    <>
      <h1>Add assignement</h1>
      <label>Choose your course:</label>
      <select name="courses" onChange={(e) => { setCourse(e.currentTarget.value) }}>
        {courses && Object.keys(courses).map(key => {
          return <option value={courses[key]._id}>{courses[key].course}</option>
        })}
      </select>
      <input type='text' onChange={(e) => { setAssignement(e.currentTarget.value) }} />
      <button onClick={handleSubmit}>Add</button>
    </>
  )
}