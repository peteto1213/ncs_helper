import React from 'react'
import {FaAddressCard} from 'react-icons/fa'
import {useSelector} from 'react-redux'

function UserProfile() {

  const {user} = useSelector((state) => state.auth)

  return (
    <section className='user-profile'>
        <div className="heading">
            <FaAddressCard />
            <h1>Welcome Home, {user.nickname}</h1>
        </div>

        <div className="profile-container">
          <form>
            <div className="user-info-column">
              <h3>Registered Email:</h3>
              <input
                className='disabled-input'
                type="text"
                value={user.email}
                disabled 
              />
            </div>

            <div className="user-info-column">
              <h3>Update Nickname:</h3>
              <input 
                type="text"
                placeholder='enter a nickname'
              />
            </div>

            <div className="user-info-column">
              <h3>Update Profile Picture:</h3>
              <input 
                type="file"
              />
            </div>

            <button className='btn'>Update</button>
          </form>

          <div className="profile-picture">
            <img src={user.icon} alt="profile-picture" />
          </div>
        </div>
    </section>
  )
}

export default UserProfile