import React from 'react'
import {FaUserPlus} from 'react-icons/fa'

function Register() {
  return (
    <section className='register'>
      <div className="heading">
        <FaUserPlus />
        <h1>User Registration</h1>
      </div>

      <form>
        <div className="input-field">
          <h3>Please enter your Newcastle University email <span>(for login)</span></h3>
          <input 
            type="text"
            placeholder='enter your email address'
            name="email"
            required
          />
        </div>

        <div className="input-field">
          <h3>Please enter your password</h3>
          <input 
            type="password"
            placeholder='enter your password'
            name="password"
            required
          />
        </div>

        <div className="input-field">
          <h3>Please confirm your password</h3>
          <input 
            type="password"
            placeholder='confirm your password'
            name="password2"
            required
          />
        </div>

        <div className="input-field">
          <h3>Please enter your nickname <span>(for display)</span></h3>
          <input 
            type="text"
            placeholder='enter your nickname'
            name="nickname"
            required
          />
        </div>

        <button className='btn'>register</button>

      </form>
    </section>
  )
}

export default Register