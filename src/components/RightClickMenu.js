import { React, useState, useEffect } from "react";
import '../styles/RightClickMenu.css';

export function RightClickMenu(data) {

    const [playlists, setPlaylists] = useState([]);

    const menuStyles = {
        position: 'absolute',
        top: `${data.data.posY}px`,
        left: `${data.data.posX}px`
    }

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

    useEffect(() => { getInfo(); console.log(playlists) }, [JSON.stringify(playlists)])

    return (
        <div style={menuStyles} className='menuDiv'>
            <h3>Afegir a una llista</h3>
            {playlists.map((playlist) =>
                <h4>{playlist.name}</h4>
            )}
        </div>
    );
}