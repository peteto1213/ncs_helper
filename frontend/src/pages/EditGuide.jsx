import React, { useState, useEffect } from 'react'
import{ FaPen, FaFastBackward } from 'react-icons/fa'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import parser from 'html-react-parser'
import { useNavigate } from 'react-router-dom'

function EditGuide() {
    const navigate = useNavigate()
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

  const navigateMyGuide = () => {
    navigate('/myGuide')
  }

  return (
    <section className='create-guide'>
      <div className="heading">
        <FaPen />
        <h1>Edit Guide Content</h1>
      </div>

        <form>
          <div className="input-field">
            <h3>Enter a title for your guide</h3>
            <input 
              type="text"
              value="Title"
              disabled
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
                <h1 className='title'>Title</h1>
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
              disabled
            >
              <option value="">===Choose a subtopic===</option>
              {/* Subtopic map here */}
              
            </select>
          </div>

          <div className="input-field">
            <h3>Design a question for your audience</h3>
            <input 
                type="text"
                disabled
            />
            <input 
                type="text"
                disabled
            />
          </div>

          <button className='btn'>Edit Guide</button>
        </form>

        <button onClick={navigateMyGuide} className='back-btn'><FaFastBackward /> Select other guides</button>
    </section>
  )
}

export default EditGuide