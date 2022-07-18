import React from 'react'
import { useState, useEffect } from 'react'
import {FaAddressCard} from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import {updateInfo} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function UserProfile() {
  const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const[error, setError] = useState("123")

  const[nickname, setNickname] = useState(
    user.nickname? user.nickname : ""
  )

  const[icon, setIcon] = useState(
    user.icon? user.icon : ""
  )

  const handleNicknameChange = (event) => {
    setNickname(event.target.value)
  }

  const handleIconChange = (event) => {
    setIcon(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(!nickname){
      setNickname(user.nickname)
    }
    const userData = new FormData()

    userData.append('nickname', nickname)
    if(icon){
      userData.append('icon', icon)
    }
    dispatch(updateInfo(userData))
  }

  useEffect(() => {
    if(isError){
      setError(message)
    }
    if(isSuccess || user){
      setError("Update Successful! the changes will be effective on next login")
    }
  }, [user, isError, isLoading, isSuccess, message, dispatch])

  useEffect(() => {
    setError('')
  }, [])

  if(isLoading){
    return <Spinner />
  }
  

  return (
    <section className='user-profile'>
        <div className="heading">
            <FaAddressCard />
            <h1>Welcome Home, {user.nickname}</h1>
        </div>

        <div className="profile-container">

          <form onSubmit={handleSubmit}>
            <div className="user-info-column">
              <h3>Registered Email:</h3>
              <input
                className='disabled-input'
                type="text"
                name='email'
                value={user.email}
                disabled 
              />
            </div>

            <div className="user-info-column">
              <h3>Update Nickname:</h3>
              <input 
                type="text"
                placeholder='enter a nickname'
                name='nickname'
                onChange={handleNicknameChange}
                value={nickname}
                required
              />
            </div>

            <div className="user-info-column">
              <h3>Update Profile Picture:</h3>
              <input 
                type="file"
                name="icon"
                id='icon'
                accept="image/*"
                onChange={handleIconChange}
              />
            </div>
            {error ?
              <h2 className='error'>{error}</h2>
              :
              <></>
            }
            <button className='btn'>Update</button>
          </form>

          <div className="profile-picture">
            <img src={`${process.env.PUBLIC_URL}/userIcons/${user.icon}`} alt=""/>
          </div>
        </div>
    </section>
  )
}

export default UserProfile