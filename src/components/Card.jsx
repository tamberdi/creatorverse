import { useNavigate } from "react-router-dom";

function Card({id, name, url, description, imageURL}) {
    const navigate = useNavigate()

    return (
        <article>
            {imageURL && (
                <img src={imageURL} alt={name} width="200" />
            )}
            <h2>{name}</h2>
            <p>{description}</p>
            <a href={url} target="_blank">Visit Channel</a>
            <br />
            <button onClick={() => navigate(`/view/${id}`)}>
                View
            </button>
            <button onClick={() => navigate(`/edit/${id}`)}>
                Edit
            </button>
        </article>
    )
}

export default Card