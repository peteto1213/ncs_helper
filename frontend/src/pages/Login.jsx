import React from 'react'
import { useState } from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import websiteLogo from '../resources/robot.png'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { useEffect } from 'react'

function Login() {
  const[error, setError] = useState('')

  const[form, setForm] = useState({
    email: '',
    password: ''
  })

  const {email, password} = form

  const dispatch = useDispatch()

  const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)

  const handleChange = (event) => {
    const{name, value} = event.target
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleLogin = (event) => {
    event.preventDefault()

    const userData = {
      email: email,
      password: password
    }

    if(!email.includes("@newcastle.ac.uk")){
      setError("Please use your Newcastle University email address to login i.e.(xxx@newcastle.ac.uk)")
    }
    else{
      dispatch(login(userData))
    }
  }

  const navigate = useNavigate();
  const navigateRegister = () => {
    navigate('/register')
  }
  const navigateForgetPassword = () => {
    navigate('/fogetPassword')
  }

  useEffect(() => {
    if(isError){
      setError(message)
    }
    if(isSuccess || user){
      navigate('/dashboard')
    }
    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  if(isLoading){
    return <Spinner />
  }

  return (
    <section className='login'>
      <div className="heading">
        <FaSignInAlt />
        <h3>Login to explore the materials</h3>
      </div>

      <div className="form-container">
        <img src={websiteLogo} alt="websiteLogo" />

        <form onSubmit={handleLogin}>
          <div className="input-field">
            <h3>Newcastle University Email</h3>
            <input 
              type="email"
              placeholder='email@newcastle.ac.uk'
              name='email'
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <h3>password</h3>
            <input 
              type="password"
              placeholder='password'
              name='password'
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <h2 className='error'>{error}</h2>}
          <button className='btn'>Login</button>
        </form>
        <h3>Don't have an account? <span onClick={navigateRegister}>Register now</span></h3>
        <h3>Forget password? <span onClick={navigateForgetPassword}>Click here</span></h3>
      </div>
    </section>
  )
}

export default Login