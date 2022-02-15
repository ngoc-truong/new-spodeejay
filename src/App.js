import React from "react";

const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;

function App() {
  return (
    <div>
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        Login to Spotify
      </a>
    </div>
  );
}

export default App;
