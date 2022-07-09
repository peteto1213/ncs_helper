import React, { useState, useEffect } from 'react'
import{ FaPlusSquare } from 'react-icons/fa'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import parser from 'html-react-parser'

function CreateGuide() {
  
  const [form, setForm] = useState({
    title: "",
    subtopic: ""
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

  return (
    <section className='create-guide'>
      <div className="heading">
        <FaPlusSquare />
        <h1>Create your guide</h1>
      </div>

        <form>
          <div className="input-field">
            <h3>Enter a title for your guide</h3>
            <input 
              type="text"
              name='title'
              value={form.title}
              onChange={handleFormChange}
              placeholder='blog title...'
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
              name="blogCategory"
              value={form.blogCategory} 
              onChange={handleFormChange}
              id="blogCategory" 
              required
            >
              <option value="">===Choose a subtopic===</option>
              {/* Subtopic map here */}
              
            </select>
          </div>

          <div className="input-field">
            <h3>Design a question for your audience</h3>
            <input 
                type="text"
                placeholder='enter the question...'
                required
            />
            <input 
                type="text"
                placeholder='answer to the question...'
                required
            />
          </div>

          <button className='btn'>Publish Guide</button>
        </form>
    </section>
  )
}

export default CreateGuide