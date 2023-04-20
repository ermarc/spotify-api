import { React, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AlbumDetail.css';

export function TrackPlayback() {

    const {id} = useParams();
    const [track, setTrack] = useState ([]);

    function isEverythingLoaded() {
        let count = 0;
        return (count == 0 ? true : false);
    }

    const fetchTrackFromApi = async (trackId) => {
        const headerObj = new Headers();
        headerObj.append('Content-Type', 'application/json');
        headerObj.append('Authorization', `Bearer ${window.localStorage.getItem("token")}`)
            
        const opt = {method: "GET", headers: headerObj}
        const url = `https://api.spotify.com/v1/tracks/${trackId}`;
    
        let response = await fetch(url, opt);
        let data = await response.json();

        setTrack(data);
    }

    useEffect(() => { fetchTrackFromApi(id); });

    return (
        <div>
            {
            isEverythingLoaded() ?
                <div>
                    <div>
                        <h1 style={{color: 'white'}}>CACOTA MAX</h1>
                    </div>
                </div>
            :
                <pre></pre>
            }
        </div>
    )
}