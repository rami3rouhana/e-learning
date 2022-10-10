import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { GlobalStateContext } from "../../../context/GlobalState";



const Header = () => {

    useEffect(() => {
        const fetchData = async () => {
            const data = await userInfo.getStudents();
            debugger
        }
        fetchData();
    })

    const userInfo = useContext(GlobalStateContext);

    debugger

    return (
        <>
            <ul>
                {!userInfo.user.loggedIn && <li><Link to='/'>Login</Link></li>}
                {userInfo.user.loggedIn && userInfo.user.role === 1 && <li><Link to='/student'>Student</Link></li>}
                {userInfo.user.loggedIn && userInfo.user.role === 2 && <li><Link to='/admin'>Admin</Link></li>}
                {userInfo.user.loggedIn && userInfo.user.role === 3 && <li><Link to='/professor'>Professor</Link></li>}
                {userInfo.user.loggedIn && <li><Link to='/'>Logout</Link></li>}
            </ul>
            <hr />
        </>
    )
}

export default Header;