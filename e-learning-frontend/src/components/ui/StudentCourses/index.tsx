import { useEffect, useContext } from 'react';
import { GlobalStateContext } from "../../../context/GlobalState";
const StudentCourses = () => {
    const userInfo = useContext(GlobalStateContext);
    useEffect(() => {
        const fetch = async () => {
            await userInfo.getCourses();
            await userInfo.getAnnouncements();
            await userInfo.getAssignements();
        }
        fetch();
    }, [])
    const announecements: any = userInfo.state.announecements;
    const assignements: any = userInfo.state.assignements;
    const courses: any = userInfo.state.courses;

    return <>
        <table>
            <tbody>
                <tr>
                    <th>Classes Announecement</th>
                </tr>
                <tr>
                    {announecements && announecements[0].map((announecement:any) => {
                        return <td key={announecement._id}>{announecement.announcement}</td>
                    })}
                </tr>
            </tbody>
        </table>
        <table>
            <tbody>
                <tr>
                    <th>Your Courses</th>
                </tr>
                <tr>
                    {assignements && assignements[0].map((assignement:any) => {
                        return <td key={assignement._id}>{assignement.assignement}</td>
                    })}
                </tr>
            </tbody>
        </table>
        <table>
            <tbody>
                <tr>
                    <th>Your Courses</th>
                </tr>
                <tr>
                    {courses && courses[0].map((course:any) => {
                        return <td key={course._id}>{course.course}</td>
                    })}
                </tr>
            </tbody>
        </table>
    </>
}

export default StudentCourses;