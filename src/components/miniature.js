import { React } from "react";
import { Link } from "react-router-dom";
import '../styles/Miniature.css';

export function Miniature(data) {
    return (
        <Link to={`/artist-detail/${data.data.id}`} className='miniatureContainer'>
            <img className='miniatureImage' src={data.data.images[0].url}></img>
            <h1 className='miniatureName'>{data.data.name}</h1>
            <img className='miniatureBackground' src={data.data.images[0].url}></img>
        </Link>
    );
}