import { React, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import '../img/logo.webp';
import { TokenContext } from './logThing';
import { loginUri } from '../spotifyKeys';
import '../styles/Search.css';

export function Menu() {
    const[token, setToken] = useContext(TokenContext);

    const logout = ()=> {
        setToken("");
    }

    return(
        <div className="navigationContainer">
        <nav>
        <ul className='fancyHeader'>
        <li><Link to="/"><img className="logo" key='spotifyLogo' src={require(`../img/logo.webp`)} alt="Logo d'Spotify"/></Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/lists">Llistes</Link></li>
        <li><Link to="/free">Exercici lliure!</Link></li>

        {
            token ?
                <li><button onClick={()=>logout()}>Deslogar-se</button></li>
            :
                <li><Link to={loginUri}>Logar-se</Link></li>
        }
        </ul>
        </nav>
        </div>
    )
} 