import { React, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RightClickMenu } from './RightClickMenu';
import '../styles/AlbumDetail.css';

export function AlbumDetail() {

    const {id} = useParams();
    const [album, setAlbum] = useState([]);
    const [tracks, setTracks] = useState([]);

    const[menuInfo, setMenuInfo]= useState({show: false, posX: 0, posY:0, track:""});

    const handleClick = (e) => {
        if (e.nativeEvent.button === 2) {
            setMenuInfo({show: true, posX: e.pageX, posY:e.pageY, track: e.target.getAttribute("data-key")});
        }
    }

    function isEverythingLoaded() {
        let count = 0;
        if (album.name) count++;
        if (album.artists) count++;
        if (album.images) count++;
        if (tracks) count++;
        return (count == 4 ? true : false);
    }

    const fetchAlbumFromApi = async (albumId) => {
        const headerObj = new Headers();
        headerObj.append('Content-Type', 'application/json');
        headerObj.append('Authorization', `Bearer ${window.localStorage.getItem("token")}`)
            
        const opt = {method: "GET", headers: headerObj}
        const url = `https://api.spotify.com/v1/albums/${albumId}`;
    
        let response = await fetch(url, opt);
        let data = await response.json();

        setAlbum(data)
        setTracks(data.tracks.items)
    }

    useEffect(() => { fetchAlbumFromApi(id) }, [JSON.stringify(album)]);

    return (
        <div>
            {
                menuInfo.show ?
                    <RightClickMenu data={menuInfo}></RightClickMenu>
                :
                <pre></pre>
            }
            {
            isEverythingLoaded() ?
                <div>
                    <div className='albumDetails'>
                        <h1 className='albumTitle'>{album.name}</h1>
                        <h2 className='albumArtist'>por <a href={`/artist-detail/${album.artists[0].id}`} style={{color: 'white'}}>{album.artists[0].name}</a></h2>
                        <img key='albumCover' className='albumCover' src={album.images[0].url}></img>
                    </div>
                    <img key='albumBackground' className='albumBackground' src={album.images[0].url}></img>

                    <div className='albumContent'>
                        {
                            tracks.map((track) => 
                                <a href={track.preview_url}>
                                    <div className='trackBox' onContextMenu={handleClick} key={track.id} data-key={track.id}>
                                        <h3  key={track.id} data-key={track.id}>{track.name}</h3>
                                    </div>
                                </a>
                            )
                        }
                    </div>
                </div>
            :
                <pre></pre>
            }
        </div>
    )
}