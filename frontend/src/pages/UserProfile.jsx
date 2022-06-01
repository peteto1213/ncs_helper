import React from 'react'
import {FaAddressCard} from 'react-icons/fa'

function UserProfile() {
  return (
    <section className='user-profile'>
        <div className="heading">
            <FaAddressCard />
            <h1>User Profile</h1>
        </div>
    </section>
  )
}

export default UserProfile