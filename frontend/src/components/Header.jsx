import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
      <header className='header'>
        <div className='logo'>Seungjae</div>
        <span className='nav-items'>
          <Link to="/" className='nav-link'>Home</Link>
          <Link to="/login" className='nav-link'>Login</Link>
          <Link to="/join" className='nav-link'>Join</Link>
        </span>
      </header>
  )
}

export default Header