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
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
const fetchCreator = async () => {
const { data, error } = await supabase
.from('creators')
.select()
.eq('id', id)
.single()
if (error) {
    console.error(error)
    setError(error.message)
} else {
    setName(data.name)
    setUrl(data.url)
    setDescription(data.description)
    setImageURL(data.imageURL)
}
setLoading(false)
}
fetchCreator()
}, [id])

const handleUpdate = async (e) => {
    e.preventDefault()
    if(!window.confirm('Are you sure you want to update this creator?')) return

const { error } = await supabase
.from('creators')
.update({ name, url, description, imageURL })
.eq('id', id)
if (error) console.error(error)
else navigate('/')
}

const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this creator?')) return
    
    const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id', id)
    if (error) console.error(error)
    else navigate('/')
}

if (loading) return <div>Loading...</div>
if (error) return <div style={{ color: 'red' }}>{error}</div>

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
<textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
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