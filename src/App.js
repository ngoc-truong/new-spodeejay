import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;

function App() {
  const [token, setToken] = useState("");
  const [playlists, setPlaylist] = useState("");

  // Get the returned token from spotify
  useEffect(() => {
    // We take the access token from the URL of the window (in the hash)
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((element) => element.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlaylist(data);
    };
    console.log(`Was geht hier gerade ab: ${token}`);
    fetchData();
  }, [token]);

  const renderPlaylists = () => {
    if (!playlists) {
      return <p>Sorry, keine Playlists vorhanden.</p>;
    } else {
      return playlists.items.map((playlist) => (
        <p key={playlist.id}>{playlist.name}</p>
      ));
    }
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div>
      <h1>Spodeejay</h1>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login
        </a>
      ) : (
        <div>
          <button onClick={logout}>Logout</button>
          {renderPlaylists()}
        </div>
      )}
    </div>
  );
}

export default App;
