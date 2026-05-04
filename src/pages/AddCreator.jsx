import { useState } from 'react';
import { supabase } from '../client';

function AddCreator(){
  const[name, setName] = useState('')
  const[url, setUrl] = useState('')
  const[description, setDescription] = useState('')
  const[imageURL, setImageURL] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('creators')
      .insert([{ name, url, description, imageURL }])
    if (error) console.error(error)
    else alert('Creator added successfully!')
}

  return (
    <div>
      <h1>Add a Creator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Creator's name"
            required
           />
        </div>
        <div>
          <label>URL</label>
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Link to their channel"
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description of their content"
            required
            />
        </div>
        <div>
          <label>Image URL</label>
          <input 
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            placeholder="Link to their profile image"
           />
        </div>
        <button type="submit">Add Creator</button>
      </form>
    </div>
  )
}

  export default AddCreator