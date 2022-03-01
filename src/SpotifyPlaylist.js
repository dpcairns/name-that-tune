import React from 'react';

export default function SpotifyPlaylist() {
  const netlifyUrl = '/.netlify/functions/spotify';

  async function fetchPlayLists() {
    const response = await fetch(netlifyUrl);

    const json = await response.json();
  }
  fetchPlayLists();
  return (
    <div>SpotifyPlaylist</div>
  );
}
