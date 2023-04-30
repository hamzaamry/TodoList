import React from 'react'
import '../Assets/bgtodo.jpg'
import '../styles/showtodo.css'
import { Link } from 'react-router-dom';

const Herosection = () => {

  return (
    <div className='herosection'>
        <h1>
            Stay on top of your tasks and achieve your goals with ease using our todo list website
        </h1>
        <p>
            Using a todo list website can help you organize your tasks and achieve your goals without feeling overwhelmed or confused.
        </p>
        <div>
          <Link to="/Signup">
            <button className='join-btn'>Join Now</button>
          </Link>
        </div>
    </div>
  )
}

export default Herosection