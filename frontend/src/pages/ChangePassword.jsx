import React from 'react'
import { useState } from 'react'
import { FaUserLock } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {changePasswordByOldPassword, reset} from '../features/auth/authSlice'

function ChangePassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        newPassword2: ""
    })
    const [error, setError] = useState('')

    const {oldPassword, newPassword, newPassword2} = form

    const handleChange = (event) => {
        const{name, value} = event.target
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const userData = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        if(newPassword !== newPassword2){
            setError('Please enter the same new password twice to proceed ')
        }else{
            dispatch(changePasswordByOldPassword(userData))
        }
    }

    useEffect(() => {
        if(isError){
            setError(message)
        }
        if(isSuccess){
            setError('')
            alert(message)
            navigate('/')
            dispatch(reset())
        }
    }, [user, isLoading, isSuccess, isError, message, dispatch])

    if(isLoading){
        return <Spinner />
    }

  return (
    <section className='change-password'>
        <div className="heading">
            <FaUserLock />
            <h1>Change Password</h1>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="input-field">
                <h3>Enter your Old Password</h3>
                <input 
                    type='password'
                    name='oldPassword'
                    onChange={handleChange} 
                    value={oldPassword}
                    placeholder='enter your old password...'
                    required
                />
            </div>

            <div className="input-field">
                <h3>Enter a New Password</h3>
                <input 
                    type='password'
                    name='newPassword'
                    onChange={handleChange} 
                    value={newPassword}
                    placeholder='enter your new password...'
                    required
                />
            </div>

            <div className="input-field">
                <h3>Confirm your New Password</h3>
                <input 
                    type='password'
                    name='newPassword2'
                    onChange={handleChange} 
                    value={newPassword2}
                    placeholder='confirm your new password...'
                    required
                />
            </div>
            {error && <h2 className='error'>{error}</h2>}
            <button className='btn'>Change password</button>
        </form>
    </section>
  )
}

export default ChangePassword
