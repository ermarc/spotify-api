import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { TokenContext } from '../components/logThing';
import { Menu } from '../components/menu';
import { ScrollView } from 'react'; 

export function Search() {
	const [token, setToken] = useContext(TokenContext);
	const [textSearch, setTextSearch] = useState("");
	const [albums, setAlbums] = useState([]);

	const changeInput = (e) => {
		setTextSearch(e.target.value);
	}

	const linkSwitch = (type) => { 
		return `/album-detail/`;
	}

	const searchSpotyAlbums = async (e) => {
		e.preventDefault();

		const headerObj = new Headers();
		headerObj.append('Content-Type', 'application/json');
		headerObj.append('Authorization', `Bearer ${window.localStorage.getItem("token")}`)

		const opt = { method: "GET", headers: headerObj }
		const url = `https://api.spotify.com/v1/search?q=${textSearch}&type=album`;

		let response = await fetch(url, opt);
		let data = await response.json();
		setAlbums(data.albums.items);
		console.log(data.albums.items)
	}

	return (
		<div className="x">
			<Menu></Menu>

			<form className='searchForm' onSubmit={searchSpotyAlbums}>
				<input type='text' onChange={changeInput} name='textInput' placeholder='Escriu per cercar' />
				<input type='submit' value='Començar cerca' />
			</form>

			<div className='songContainerList'>
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
	)
}