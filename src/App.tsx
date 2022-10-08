import * as React from 'react';
import { Link } from 'react-router-dom';
import Main from './Main';

export default function App() {
  return (
    <>
      <div>
        <ul>
          <li><Link to='/student'>Student</Link></li>
          <li><Link to='/admin'>Admin</Link></li>
          <li><Link to='/professor'>Professor</Link></li>
        </ul>
        <hr />
        <Main />
      </div>
    </>
  )
}