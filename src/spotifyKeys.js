const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000";
const clientID = "56a4666009674864b0fb7ce4cc5f0848";

let scope = 'user-read-private user-modify-playback-state user-read-playback-state streaming playlist-modify-private user-top-read user-library-modify playlist-modify-public user-follow-read user-read-email';


export const loginUri = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;



// export const loginUri = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=token`;