import { useState, useContext } from 'react';
import { GlobalStateContext } from "../../../context/GlobalState";

export const InstructorAnnounecement = () => {
  const userInfo = useContext(GlobalStateContext);
  const courses: any = userInfo.state.courses;
  const [course, setCourse] = useState(courses?.[0]);
  const [announecement, setAnnounecement] = useState('');


    const handleSubmit = async () => {
      const data = { id: course, announecement }
      await userInfo.addAnouncement(data);
    }

  return (
    <>
      <h1>Add announcement</h1>
      <label>Choose your course:</label>
      <select name="courses" onChange={(e) => { setCourse(e.currentTarget.value) }}>
        {courses && Object.keys(courses).map(key => {
          return <option value={courses?.[key]._id}>{courses?.[key].course}</option>
        })}
      </select>
      <input type='text' onChange={(e) => { setAnnounecement(e.currentTarget.value) }} />
      <button onClick={handleSubmit}>Add</button>
    </>
  )
}
