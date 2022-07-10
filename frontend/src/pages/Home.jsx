import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {

  const [banner, setBanner] = useState(true)

  const changeBanner2 = () => {
    setBanner(false)
  }

  const changeBanner1 = () => {
    setBanner(true)
  }


  return (
    <section className={banner? "home" : "home active"}>
        <div className="content">
            <h3>Feel like lost in the forrest?</h3>
            <p>Newcastle Computer Science Helper is always here to help</p>
            <p>Let's collaborate with each other to get into the highway of Computer Science as soon as possible!</p>
            <Link onMouseLeave={changeBanner1} onMouseEnter={changeBanner2} to='/allCourses' className='btn'>View Materials</Link>
        </div>
    </section>
  )
}

export default Home