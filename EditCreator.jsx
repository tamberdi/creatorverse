import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [imageURL, setImageURL] = useState('')

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single()
      if (error) console.error(error)
      else {
        setName(data.name)
        setUrl(data.url)
        setDescription(data.description)
        setImageURL(data.imageURL)
      }
    }
    fetchCreator()
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('creators')
      .update({ name, url, description, imageURL })
      .eq('id', id)
    if (error) console.error(error)
    else navigate('/')
  }

  const handleDelete = async () => {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id)
    if (error) console.error(error)
    else navigate('/')
  }

  return (
    <div>
      <h1>Edit Creator</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>URL</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Image URL</label>
          <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
        </div>
        <button type="submit">Update Creator</button>
        <button type="button" onClick={handleDelete}>Delete Creator</button>
      </form>
    </div>
  )
}

export default EditCreator
