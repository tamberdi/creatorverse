 import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function ShowCreators() {
const [creators, setCreators] = useState([])
const navigate = useNavigate()

const fetchCreators = async () => {
const { data, error } = await supabase.from('creators').select()
if (error) console.error(error)
else setCreators(data)
 }

 useEffect(() => {
fetchCreators()
}, [])

return (
 <div>
<h1>Creatorverse</h1>
{creators.length === 0 ? (
<p>No creators yet! Add some.</p>
) : (
creators.map(creator => (
<div key={creator.id}>
{creator.imageURL && (
 <img src={creator.imageURL} alt={creator.name} width="100" />
)}
 <h2>{creator.name}</h2>
<p>{creator.description}</p>
<a href={creator.url} target="_blank">Visit Channel</a>
<button onClick={() => navigate(`/edit/${creator.id}`)}>
Edit
</button>
 </div>
))
 )}
 </div>
 )
}

export default ShowCreators