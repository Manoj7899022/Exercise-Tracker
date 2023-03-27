import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar navbar-dark bg-dark navbar-expand-xl'>
     <Link to='/' className='navbar-brand' >ExerciseTracker</Link> 
      <div className='collpase navbar-collapse'>
      <ul className='navbar-nav mr-auto' >
        <li className='navbar-item'>
          <Link className='nav-link' to='/' >Exercise</Link>
        </li>
        <li className='navbar-item'>
          <Link className='nav-link' to='/create' >Create Exercise Log</Link> 
        </li>
        <li className='navbar-item'>
          <Link className='nav-link' to='/user'>Create User</Link> 
        </li>
      </ul>
      </div>
      
    </div>
  )
}

export default Navbar