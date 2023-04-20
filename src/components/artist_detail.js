import { React, useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Menu } from './menu';
import '../styles/ArtistDetail.css';
import '../styles/Search.css';

export function ArtistDetail() {
    const {id} = useParams();
    const [artist, setArtist] = useState([]);
    const [albums, setAlbums] = useState([]);

    const linkSwitch = (type) => { 
        return `/album-detail/`;
	}

    function isEverythingLoaded() {
        let count = 0;
        if (artist.name) count++;
        if (artist.images) count++;
        if (artist.followers) count++;
        if (artist.genres) count++;
        return (count == 4 ? true : false);
    }

    const fetchArtistFromApi = async (artistId) => {
        const headerObj = new Headers();
        headerObj.append('Content-Type', 'application/json');
        headerObj.append('Authorization', `Bearer ${window.localStorage.getItem("token")}`)
            
        const opt = {method: "GET", headers: headerObj}
        const url = `https://api.spotify.com/v1/artists/${artistId}`;

        let response = await fetch(url, opt);
		let data = await response.json();
		setArtist(data);
        // setArtistImage(data.images[0].url)
        // setArtistFollows(data.followers.total)
        // setArtistGenres(data.genres)
    };

    const fetchAlbumsFromApi = async (artistId) => {
        const headerObj = new Headers();
        headerObj.append('Content-Type', 'application/json');
        headerObj.append('Authorization', `Bearer ${window.localStorage.getItem("token")}`)
            
        const opt = {method: "GET", headers: headerObj}
        const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;

        let response = await fetch(url, opt);
		let data = await response.json();

        setAlbums(data.items);
    };

    useEffect(() => { fetchArtistFromApi(id)}, [JSON.stringify(artist)])

    useEffect(() => { fetchAlbumsFromApi(id)}, [JSON.stringify(albums)])

    return (
        <div className='artistContainer'>
            {
                isEverythingLoaded() ?
                    <div>
                        <div className='mainContentContainer'>
                            <div className='mainContent'>
                                <h1 className='mainTitle'>{artist.name}</h1>
                                <h2 className='subInfo'>Seguidores: {artist.followers.total}</h2>
                                <h2 className='subInfo'>Artista de '{artist.genres[0]}', '{artist.genres[1]}', '{artist.genres[2]}'</h2>
                                <img className='artistMainImg' src={artist.images[0].url}></img>
                            </div>
                        </div>
                        <img className='artistBackImg' src={artist.images[0].url}></img>

                        <div className='albumListing'>
                            <div className='songMasterContainer'>
                                {
                                    albums.map((album) =>
                                        <Link to={linkSwitch(album.album_type) + album.id} className='songContainer'>		
                                            <div key={album.id} className='songDetailContainer'>
                                                <h1>{album.name}</h1>
                                                <img src={album.images[0].url} className='innerContainerImg'></img>
                                            </div>
                                            <img src={album.images[0].url} className='backdropImg'></img>
                                        </Link>
                                )}
                            </div>
                        </div>
                    </div>
                :
                    <pre></pre>
            }
            {
            }
        </div>
    )
}