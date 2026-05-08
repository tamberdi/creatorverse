 import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import Card from '../components/Card'

function ShowCreators() {
const [creators, setCreators] = useState([])

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
            <p>No Creators yet! Add some.</p>
        ) : (
            <div>
                {creators.map(creator => (
                    <Card
                    key={creator.id}
                    id={creator.id}
                    name={creator.name}
                    url={creator.url}
                    description={creator.description}
                    imageURL={creator.imageURL}
                    />
                ))}
            </div>
        )
    }

    </div>
)
}

export default ShowCreators