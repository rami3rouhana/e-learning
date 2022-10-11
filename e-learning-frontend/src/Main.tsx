import { Routes, Route, useNavigate } from 'react-router-dom';
import Students from './pages/Students';
import LoginPage from './pages/Login';
import Admin from './pages/Admin';
import Professor from './pages/Professor';
import { GlobalStateContext } from "./context/GlobalState";
import { useEffect, useContext } from 'react';

const Main = () => {
  const userInfo = useContext(GlobalStateContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (userInfo.user.role === 0) {
      navigate('/')
    } else if (userInfo.user.role == 1) {
      navigate('/admin')
    } else if (userInfo.user.role == 2) {
      navigate('/professor')
    } else {
      navigate('/student')
    }
  }, [userInfo, navigate])

  return (
    <Routes>
      <Route path='/' element={<LoginPage/>} />
      <Route path='/student' element={<Students />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/professor' element={<Professor />} />
    </Routes>
  );
}
export default Main;