import React, { useState, useEffect } from 'react'
import{ FaPlusSquare } from 'react-icons/fa'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import parser from 'html-react-parser'

import { useSelector, useDispatch } from 'react-redux'
import { getAllBlogCategories } from '../features/blogCategory/blogCategorySlice'
import { createBlog, reset } from '../features/blog/blogSlice'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'

function CreateBlog() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blogCategories } = useSelector((state) => state.blogCategory)
  const { creatingBlog, isError, isLoading, message } = useSelector((state) => state.blog)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getAllBlogCategories())

    if(!user){
      alert('You must login to view this page!')
      navigate('/login')
    }

    if(isError){
      alert(message)
    }

    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError, message, user, navigate])

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
    console.log(form);
  }

  const handleSubmit = () => {
    const body = {
      title: form.title,
      content: text,
      blogCategory: form.blogCategory
    }

    dispatch(createBlog(body))
    if(!message){
      navigate('/allBlogs')
    }
  }

  if(isLoading){
    return <Spinner />
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
              <option value="">===Choose a blog category===</option>
              {/* Blog Categories map here */}
              {blogCategories.map(category =>
                  <option value={category._id}>{category.name}</option>
                )}
            </select>
          </div>

          <button className='btn'>Publish Blog</button>
        </form>
    </section>
  )
}

export default CreateBlog