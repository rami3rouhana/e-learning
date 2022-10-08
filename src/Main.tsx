import { Routes, Route } from 'react-router-dom';
import Students from './pages/Students';
import Admin from './pages/Admin';
import Professor from './pages/Professor';

const Main = () => {
return (         
    <Routes>
    <Route path='/student' element={<Students/>} />
    <Route path='/admin' element={<Admin/>} />
    <Route path='/professor' element={<Professor/>} />
  </Routes>
);
}
export default Main;