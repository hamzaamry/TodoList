import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';
import { AuthContext} from '../context/AuthContext'


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    window.location.href = "/login"
  };

  return (
    <div className='nav-container'>
      <Link className='title' to='/'>
        Todo List
      </Link>
      <nav>
        {user ? (
          <>
            <span> <Link to='/all-todo'> List </Link> </span>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
