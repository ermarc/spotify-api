import {React, useState, useEffect} from 'react';
import { Menu } from '../components/menu';
import '../styles/List.css';
import unknown from '../unknown.png';
 
export function List() {

  const [playlists, setPlaylists] = useState([]);

  const getUserId = async () => {
      const headerObj = new Headers();
        headerObj.append('Content-Type', 'application/json');
        headerObj.append('Authorization', `Bearer ${window.localStorage.getItem("token")}`)
            
        const opt = {method: "GET", headers: headerObj}
        const url = `https://api.spotify.com/v1/me`;

        let response = await fetch(url, opt);
        let data = await response.json();

        return data.id;
  }

  const getUserPlaylists = async (userId) => {
      const headerObj = new Headers();
        headerObj.append('Content-Type', 'application/json');
        headerObj.append('Authorization', `Bearer ${window.localStorage.getItem("token")}`)
            
        const opt = {method: "GET", headers: headerObj}
        const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    
        let response = await fetch(url, opt);
        let data = await response.json();

        setPlaylists(data.items);
  }

  const getInfo = async () => {
    let userId = await getUserId();
    await getUserPlaylists(userId);
  }

  useEffect(() => { getInfo(); }, '')

  return (
    <div className="x">
      <Menu></Menu>
      <h1>Mis playlists</h1>
      {
        playlists.map((item) =>
            <a href={`/lists/${item.id}`}>
            {
              item.images[0] ?
                <div className='userPlaylist'>
                  <img key='playlistImage' className='playlistImage' src={item.images[0].url}></img>
                  <h2>{item.name}</h2>
                  <img key='backdropImage' className='backdropImage' src={item.images[0].url}></img>
                </div>
              :
                <div className='userPlaylist'>
                    <img key='playlistImage' className='playlistImage' src={unknown}></img>
                    <h2>{item.name}</h2>
                    <img key='backdropImage' className='backdropImage' src={unknown}></img>
                </div>
            }
            </a>
          )
      }
    </div>
  );
}