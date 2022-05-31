import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {FaUserPlus} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {register, reset} from '../features/auth/authSlice'

import Spinner from '../components/Spinner'

function Register() {
  const[error, setError] = useState("")

  const[form, setForm] = useState({
    email: "",
    password: "",
    password2: "",
    nickname: ""
  })

  const {email, password, password2, nickname} = form

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //state which state we are referring to in the redux controller
  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  const handleChange = (event) => {
    const{value, name} = event.target
    setForm(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleRegister = async(event) => {
    event.preventDefault()

    if(password !== password2){
      setError("*Password not matching, please enter the same password twice for registration")
    }
    else if(!email.includes("@newcastle.ac.uk")){
      setError("*Please enter a valid Newcastle University email address")
    }
    else{
      const userData = {
        email: email, 
        password: password, 
        nickname: nickname
      }

      dispatch(register(userData))
    }
  }

  useEffect(() => {
    if(isError){
      setError(message)
    }

    if(isSuccess || user){
      setError('')
      navigate('/')
    }
    
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  if(isLoading){
    return <Spinner />
  }

  return (
    <section className='register'>
      <div className="heading">
        <FaUserPlus />
        <h1>User Registration</h1>
      </div>

      <form onSubmit={handleRegister}>
        <div className="input-field">
          <h3>Please enter your Newcastle University email <span>(for login)</span></h3>
          <input 
            type="email"
            placeholder='enter your email address'
            name="email"
            onChange={handleChange}
            value={form.email}
            required
          />
        </div>

        <div className="input-field">
          <h3>Please enter your password</h3>
          <input 
            type="password"
            placeholder='enter your password'
            name="password"
            onChange={handleChange}
            value={form.password}
            required
          />
        </div>

        <div className="input-field">
          <h3>Please confirm your password</h3>
          <input 
            type="password"
            placeholder='confirm your password'
            name="password2"
            onChange={handleChange}
            value={form.password2}
            required
          />
        </div>

        <div className="input-field">
          <h3>Please enter your nickname <span>(for display)</span></h3>
          <input 
            type="text"
            placeholder='enter your nickname'
            name="nickname"
            onChange={handleChange}
            value={form.nickname}
            required
          />
        </div>
        {error && <h2 className='error'>{error}</h2>}
        <button className='btn'>register</button>

      </form>
    </section>
  )
}

export default Register