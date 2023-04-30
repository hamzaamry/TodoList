import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    const { data } = await axios.post('http://localhost:8000/api/users/signup', { email, password });
    login(data.result, data.token);
    
      // redirect to the new user's todo list
      Navigate(`/create-todo`);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className='wrapper'>
      <form className="form-box" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} required
            autocomplete="off"
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required
            autocomplete="off"
          />
        </div>
        <button className="form-button" type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
