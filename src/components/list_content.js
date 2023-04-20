import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function ListContent() {
    const {id} = useParams();

    const [tracks, setTracks] = useState([]);
    

    const getTracks = async (playlistId) => {
        const headerObj = new Headers();
        headerObj.append('Content-Type', 'application/json');
        headerObj.append('Authorization', `Bearer ${window.localStorage.getItem("token")}`)
            
        const opt = {method: "GET", headers: headerObj}
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        
        let response = await fetch(url, opt);
        let data = await response.json();

        setTracks(data.items);
    }

    useEffect(() => { getTracks(id) }, [JSON.stringify(tracks)])

    return(
        <div>
            <h1>Cançons</h1>
            {
                tracks.map((track) => 
                <a href={track.track.preview_url}>
                    <div className='trackBox' key={track.track.id} data-key={track.track.id}>
                        <h3 key={track.track.id} data-key={track.track.id}>{track.track.name}</h3>
                    </div>
                </a>
            )
            }
        </div>
    );
}