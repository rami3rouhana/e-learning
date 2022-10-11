import { useState, useContext } from 'react';
import { GlobalStateContext } from "../../../context/GlobalState";

const AdminCourse = () => {
    const userInfo = useContext(GlobalStateContext);

    const instructors: any = userInfo.state.instructors;
    const [Instructor, setInstructor] = useState(instructors?.[0]._id);

    const [course, setCourse] = useState('');


    const handleSubmit = async () => {
        const data = { course, id: Instructor}
        await userInfo.addCourse(data);
    }

    return (
        <>
            <h1>Add course</h1>
            <input type='text' placeholder='Course' onChange={(e) => { setCourse(e.currentTarget.value) }} />
            <select name="courses" onChange={(e) => { setInstructor(e.currentTarget.value) }}>
                {instructors && Object.keys(instructors).map(key => {
                    return <option value={instructors?.[key]._id}>{instructors?.[key].name}</option>
                })}
            </select>
            <button onClick={handleSubmit}>Add</button>
        </>
    )
}

export default AdminCourse;