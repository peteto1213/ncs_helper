import React from 'react'
import { useState, useEffect } from 'react'
import {FaSignInAlt} from 'react-icons/fa'

function Login() {

    const[formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData;

    const onChange = (event) => {
        const {name, value} = event.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmit = (event) => {
        event.preventDefault()
    }

  return (
    <>
        <section className='heading'>
            <h1>
                <FaSignInAlt/>
                Login
            </h1>
            <p>Please login here</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder='Newcastle university email'
                        id='email' 
                        name='email' 
                        value={email}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder='password'
                        id='password' 
                        name='password' 
                        value={password}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <button type='submit' className='btn btn-block'>
                        Login
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login