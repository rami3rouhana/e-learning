import { useState, useContext } from 'react';
import { GlobalStateContext } from "../../../context/GlobalState";

const AdminUser = () => {
    const userInfo = useContext(GlobalStateContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');


    const handleSubmit = async () => {
        const data = { name, email, password, role }
        await userInfo.addUser(data);
    }

    return (
        <>
            <h1>Add user</h1>
            <input type='text' placeholder='Name' onChange={(e)=>{setName(e.currentTarget.value)}} />
            <input type='text' placeholder='Email' onChange={(e)=>{setEmail(e.currentTarget.value)}}/>
            <input type='password' placeholder='Password' onChange={(e)=>{setPassword(e.currentTarget.value)}}/>
            <select onChange={(e)=>{setRole(e.currentTarget.value)}}>
                <option value="2">Instructor</option>
                <option value="3">Student</option>
            </select>
            <button onClick={handleSubmit}>Add</button>
        </>
    )
}

export default AdminUser;