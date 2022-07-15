import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import{ FaEdit, FaTag, FaFastBackward } from 'react-icons/fa'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import parser from 'html-react-parser'

import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, reset } from '../features/blog/blogSlice'
import Spinner from '../components/Spinner'


function EditBlog() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [preview, setPreview] = useState(false)
    const { state } = useLocation()
    const { updatedBlog, isError, isLoading, message, isSuccess } = useSelector((state) => state.blog)

    const navigateMyBlog = () => {
      navigate('/myBlog')
    }

    //get blog details by state passed in
    const { id, title, content, blogCategory } = state

    const [form, setForm] = useState({
        title: title,
        blogCategory: blogCategory
    })
    const [text, setText] = useState(content)

    const handleTextChange = (event, editor) => {
        const data = editor.getData()
        setText(data)
    }

    const togglePreview = () => {
        setPreview(!preview)
    }  

    //passed in the edited content to the rest api
    const handleSubmit = () => {
        const body = {
            id: id,
            content: text
        }

        if(text){
            dispatch(updateBlog(body))
            alert('Blog updated successfully!')
            navigate('/myBlog')
        }else{
            alert('Please do not leave the content empty')
            navigate('/myBlog')
        }

    }

    useEffect(() => {
        if(isError){
            alert(message)
            navigate('/dashboard')
        }

        return () => {
            dispatch(reset())
        }
    }, [isError, message, dispatch, navigate])

    if(isLoading){
        return <Spinner />
    }

  return (
    <section className='create-blog'>
      <div className="heading">
        <FaEdit />
        <h1>Edit your Blog</h1>
      </div>

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <h3>Blog Title</h3>
            <input 
              type="text"
              name='title'
              value={form.title}
              disabled
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
                <div className='preview-content'>{parser(text)}</div>
              </> 
              : 
              ""
            }
          </div>

          <div className="input-field">
            <h3><FaTag />Blog category</h3>
            <input 
                type="text"
                value={form.blogCategory.name}
                disabled 
            />
          </div>

          <button className='btn'>Update Blog Content</button>
        </form>

        <button onClick={navigateMyBlog} className='back-btn'><FaFastBackward /> Select other blogs</button>
    </section>
  )
}

export default EditBlog
