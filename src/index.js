import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import { List } from './pages/List.js';
import { Search } from './pages/Search.js';
import { Menu } from './components/menu.js';
import { Context } from './components/logThing.js';
import { Login } from './login.js';
import { ArtistDetail } from './components/artist_detail';
import { AlbumDetail } from './components/album_detail';
import { TrackPlayback } from './components/track_playback';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  { path: "/",
    element: <Menu/> },
  { path: "lists",
    element: <List/> },
  { path: "search",
    element: <Search/> },
  { path: "login",
    element: <Login/> },
  { path: "artist-detail/:id",
    element: <ArtistDetail/> },
  { path: "album-detail/:id",
    element: <AlbumDetail/> },
  { path: "track-playback/:id",
    element: <TrackPlayback/>
  },
      
]);

root.render(
  <React.StrictMode>
    <Context>
      <RouterProvider router={router} />
    </Context>
  </React.StrictMode>
);