import { React, useState, useEffect } from 'react';
import { Menu } from '../components/menu';
import { Miniature } from '../components/miniature';
import '../styles/Free.css';

export function Free() {
	const [info, setInfo] = useState([]);
    const [artists, setArtists] = useState([]);

    function isEverythingLoaded() {
        let count = 0;
        if (info.display_name) count++;
        if (info.email) count++;
        if (info.images) count++;
        if (info.product) count++;
        if (artists) count++;
        return (count === 5 ? true : false);
    }

    const getPersonalInfo = async () => {
		const headerObj = new Headers();
		headerObj.append('Content-Type', 'application/json');
		headerObj.append('Authorization', `Bearer ${window.localStorage.getItem("token")}`)

		const opt = { method: "GET", headers: headerObj }
		const url = `https://api.spotify.com/v1/me/`;

		let response = await fetch(url, opt);
		let data = await response.json();
        
        setInfo(data);
	}

    const getFollowedArtists = async () => {
		const headerObj = new Headers();
		headerObj.append('Content-Type', 'application/json');
		headerObj.append('Authorization', `Bearer ${window.localStorage.getItem("token")}`)

		const opt = { method: "GET", headers: headerObj }
		const url = `https://api.spotify.com/v1/me/top/artists`;

		let response = await fetch(url, opt);
		let data = await response.json();
        
        setArtists(data.items);
	}

    useEffect(() => { getPersonalInfo(); }, [])
    
    useEffect(() => { getFollowedArtists(); }, [])

    return(
        <div>
            <Menu></Menu>

            <h1 className='freeTitle'>La teva informació</h1>
            <br></br><br></br>

            {
                isEverythingLoaded() ?
                    <div className='responseContainer'>   
                        <div className='infoContainer'>
                            <img className='infoImage' src={info.images[0].url}></img>
                            <div className='infoData'>
                                <h1>{info.display_name}</h1>
                                <h3>{info.email}</h3>
                                <h3>Usuari '{info.product}'</h3>
                            </div>
                            <img className='infoBackground' src={info.images[0].url}></img>
                        </div>
                        <br></br>

                        <h1 className='freeTitle'>Artistes que més escoltes</h1>
                        <div className='freeArtistCompilation'>
                        {
                            artists.map((artist) => 
                                <Miniature data={artist}></Miniature>
                            )
                        }
                        </div>
                    </div>

                :
                <pre></pre>
            }
        </div>
    );
}