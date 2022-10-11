import { useEffect, useContext, useState } from 'react';
import { GlobalStateContext } from "../../../context/GlobalState";

export const InstructorStudents = () => {
  const userInfo = useContext(GlobalStateContext);
  const courses: any = userInfo.state.courses;
  const [course, setCourse] = useState(courses?.[0]._id);

  useEffect(() => {
    const fetch = async () => {
      await userInfo.getStudents()
    }
    fetch();
  }, [])
  const students: any = userInfo.state.students;
  const [student, setStudent] = useState(students?.[0]._id);

  const handleSubmit = async () => {
    const data = { student_id: student, course_id: course }
    await userInfo.addStudentCourse(data);
  }

  return (
    <>
    <h1>Add Student</h1>
      <label>Choose your course:</label>
      <select name="courses" onChange={(e) => { setCourse(e.currentTarget.value) }}>
        {courses && Object.keys(courses).map(key => {
          return <option value={courses?.[key]._id}>{courses?.[key].course}</option>
        })}
      </select>
      <label>Choose your Student:</label>
      <select name="students" onChange={(e) => { setStudent(e.currentTarget.value) }}>
        {students && Object.keys(students).map(key => {
          return <option value={students?.[key]._id}>{students?.[key].name}</option>
        })}
      </select>
      <button onClick={handleSubmit}>Add</button>
    </>
  )
}
