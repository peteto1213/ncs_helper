import React, { useState, useEffect } from 'react'
import{ FaPlusSquare } from 'react-icons/fa'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import parser from 'html-react-parser'

import { getAllSubtopics } from '../features/subtopic/subtopicSlice'
import { createGuide } from '../features/guide/guideSlice'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'

function CreateGuide() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { allSubtopics } = useSelector((state) => state.subtopic)
  const { user } = useSelector((state) => state.auth)
  const { isError, isLoading, message } = useSelector((state) => state.guide)

  useEffect(() => {
    if(!user){
      navigate('/login')
    }

    dispatch(getAllSubtopics())

    if(isError){
      alert(message)
    }

  }, [user, navigate, dispatch, isError, message])

  const [form, setForm] = useState({
    title: "",
    subtopic: "",
    question: "",
    answer: ""
  })

  //content of the rich text editor
  const [text, setText] = useState("")
  const [preview, setPreview] = useState(false)

  const togglePreview = () => {
    setPreview(!preview)
  }

  const handleTextChange = (event, editor) => {
    const data = editor.getData()
    setText(data)
  }

  const handleFormChange = (event) => {
    const {value, name} = event.target
    setForm((prevState => ({
      ...prevState,
      [name]: value
    })))
  }

  const handleCreateGuide = (event) => {
    event.preventDefault()

    let body = {
      name: form.title,
      content: text,
      subtopic: form.subtopic,
      guideQuestions: [
        {
          question: form.question,
          answer: form.answer
        }
      ]
    }

    dispatch(createGuide(body))
    if(!isError){
      alert('Guide Created Successfully!')
      navigate('/allGuides')
    }
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <section className='create-guide'>
      <div className="heading">
        <FaPlusSquare />
        <h1>Create your guide</h1>
      </div>

        <form onSubmit={handleCreateGuide}>
          <div className="input-field">
            <h3>Enter a title for your guide</h3>
            <input 
              type="text"
              name='title'
              value={form.title}
              onChange={handleFormChange}
              placeholder='guide title...'
              required
            />
          </div>

          {/* Rich text editor here */}
          <div className="rich-text-editor">
            <h3>Guide Content</h3>
            <CKEditor
              className='ck-editor'
              editor={ ClassicEditor }
              data={text}
              onChange={handleTextChange}
            />
          </div>

          <div className='preview'>
            <h3 onClick={togglePreview} className='preview-wording'>Click to Preview</h3>
            {preview?
              <>
                <h1 className='title'>{form.title}</h1>
                {parser(text)}
              </> 
              : 
              ""
            }
          </div>

          <div className="input-field">
            <h3>Choose a subtopic for your guide</h3>
            <select 
              name="subtopic"
              value={form.subtopic} 
              onChange={handleFormChange}
              id="subtopic" 
              required
            >
              <option value="">===Choose a subtopic===</option>
              {/* Subtopic map here */}
              {
                allSubtopics.map((subtopic) => (
                  <option value={subtopic._id}>{subtopic.name}</option>
                ))
              }
            </select>
          </div>

          <div className="input-field">
            <h3>Design a question for your audience</h3>
            <input 
                type="text"
                placeholder='enter the question...'
                name='question'
                value={form.question}
                onChange={handleFormChange}
                required
            />
            <h3>Answer</h3>
            <input 
                type="text"
                placeholder='answer to the question...'
                name='answer'
                value={form.answer}
                onChange={handleFormChange}
                required
            />
          </div>

          <button className='btn'>Publish Guide</button>
        </form>
    </section>
  )
}

export default CreateGuide