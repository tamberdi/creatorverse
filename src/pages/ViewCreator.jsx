import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

function ViewCreator() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [creator, setCreator] = useState(null)

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
            .from('creators')
            .select()
            .eq('id', id)
            .single()
            if(error) console.error(error)
            else setCreator(data)
        }
        fetchCreator()
    }, [id])

    if (!creator) return <p>Loading...</p>

    return(
        <div>
            {creator.imageURL && (
                <img src={creator.imageURL} alt={creator.name} width="200" />
            )}
            <h1>{creator.name}</h1>
            <p>{creator.description}</p>
            <a href={creator.url} target="_blank">Visit Channel</a>
            <br />
            <button onClick={() => navigate(`/edit/${creator.id}`) }>
                Edit
            </button>
            <button onClick={() => navigate('/')}>
                Go Back
            </button>
        </div>
    )
}

export default ViewCreator
