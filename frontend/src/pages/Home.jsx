import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <section className="home">
        <div className="content">
            <h3>Feel like lost in the forrest?</h3>
            <p>Newcastle Computer Science Helper is always here to help</p>
            <p>Let's collaborate with each other to get into the highway of Computer Science as soon as possible!</p>
            <Link to='/course' classname='btn'>View Materials</Link>
        </div>
    </section>
  )
}

export default Home