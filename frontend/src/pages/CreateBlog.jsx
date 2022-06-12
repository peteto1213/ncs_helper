import React, { useState } from 'react'
import{ FaEdit, FaPlusSquare } from 'react-icons/fa'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import parser from 'html-react-parser'

function CreateBlog() {

  const [form, setForm] = useState({
    title: "",
    blogCategory: ""
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

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <section className='create-blog'>
      <div className="heading">
        <FaPlusSquare />
        <h1>Create your blog</h1>
      </div>

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <h3>Enter a title for your blog</h3>
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
            <h3>Blog Content</h3>
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
            <h3>Choose a category for your blog</h3>
            <select 
              name="blogCategory"
              value={form.blogCategory} 
              onChange={handleFormChange}
              id="blogCategory" 
              required
            >
              <option value="leisure">Leisure</option>
              <option value="soft-skills">Soft-skills</option>
              <option value="interviews">Interviews</option>
            </select>
          </div>

          <button className='btn'>Publish Blog</button>
        </form>
    </section>
  )
}

export default CreateBlog