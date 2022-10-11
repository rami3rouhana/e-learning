import { useEffect, useContext } from 'react';
import { GlobalStateContext } from '../../context/GlobalState';
import AdminUser from '../../components/ui/AdminUser';
import AdminCourse from '../../components/ui/AdminCourse';

const Admin = () => {
    const userInfo = useContext(GlobalStateContext);
    useEffect(() => {
        const fetch = async () => {
            await userInfo.getCourses();
            await userInfo.getInstructors();
        }
        fetch();
    }, [])
    return <>
        <AdminCourse />
        <AdminUser />
    </>;
}
export default Admin;