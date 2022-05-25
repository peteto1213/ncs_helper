import React from 'react'
import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {

    const[formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (event) => {
        const {name, value} = event.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmit = (event) => {
        event.preventDefault()

        if(password !== password2){
            toast.error("Password do not match")
        }else{
            const userData = {
                name, 
                email, 
                password
            }

            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner />
    }

  return (
    <>
        <section className='heading'>
            <h1>
                <FaUser />
                Register
            </h1>
            <p>Please create an account</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder='Please enter your name'
                        id='name' 
                        name='name' 
                        value={name}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder='Please enter your email'
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
                        placeholder='Please enter your password'
                        id='password' 
                        name='password' 
                        value={password}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder='Confirm your password'
                        id='password2' 
                        name='password2' 
                        value={password2}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <button type='submit' className='btn btn-block'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register