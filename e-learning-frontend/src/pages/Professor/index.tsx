import { useEffect, useContext } from 'react';
import { GlobalStateContext } from '../../context/GlobalState';
import {InstructorAnnounecement} from '../../components/ui/InstructorAnnounecement';
import {InstructorAssignement} from '../../components/ui/InstructorAssignement';
import {InstructorStudents} from '../../components/ui/InstructorStudents';
const Professor = () => {
    const userInfo = useContext(GlobalStateContext);
    useEffect(() => {
        const fetch = async () => {
            await userInfo.getCourses();
        }
        fetch();
    }, [])
    return <>
    <InstructorAssignement/>
    <InstructorAnnounecement/>
    <InstructorStudents/>
    </>;
}
export default Professor;