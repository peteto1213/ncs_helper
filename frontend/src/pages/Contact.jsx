import React, { useState } from 'react'
import { FaHeadset } from 'react-icons/fa'

function Contact() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        topic: "",
        content: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm((prevForm) => {
            return {
                ...prevForm,
                [name]: value
            }
        })
    }

    const handleSubmit = () => {
        
        if(form.name && form.email && form.topic && form.content){
            fetch("https://formsubmit.co/ajax/team3NU@outlook.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    topic: form.topic,
                    content: form.content
                })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .then(() => alert('your contact form is submitted successfully!'))
                .catch(error => alert(error))
        }else{
            alert('Please complete all the required fields')
        }
    }

  return (
    <section className='contact'>
        <div className="heading">
            <FaHeadset className='icon' />
            <h1>Contact Us</h1>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="input-field">
                <h3>Name</h3>
                <input 
                    type="text"
                    placeholder='please enter your name'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                />
            </div>

            <div className="input-field">
                <h3>Email</h3>
                <input 
                    type="email"
                    placeholder='please enter your email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <div className="input-field">
                <h3>Topic</h3>
                <input 
                    type="text"
                    placeholder='please enter the topic of the content'
                    name='topic'
                    value={form.topic}
                    onChange={handleChange}
                />
            </div>

            <div className="input-field">
                <h3>Content</h3>
                <textarea 
                    rows="20"
                    placeholder='please explain the event in details'
                    name='content'
                    value={form.content}
                    onChange={handleChange}
                />
            </div>

            <button className='btn'>Submit</button>
        </form>
    </section>
  )
}

export default Contact