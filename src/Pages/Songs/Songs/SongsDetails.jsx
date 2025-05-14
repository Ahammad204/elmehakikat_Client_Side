import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const MusicDetails = () => {
  const { id } = useParams(); // Get song id from URL
  const [song, setSong] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/all-music') // Correct URL
      .then((res) => res.json())
      .then((data) => {
        const foundSong = data.find((item) => item._id === id); // Compare with _id
        setSong(foundSong);
      })
      .catch((err) => console.error("Error fetching music:", err));
  }, [id]);

  if (!song) {
    return <div className="text-center py-20 text-[#b99543]">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center px-4 py-10 my-20">
      <h1 className="text-3xl md:text-4xl font-bold text-[#b99543] text-center mb-6">
        {song.title}
      </h1>

      <audio controls className="w-full max-w-2xl mb-6">
        <source src={song.audioUrl || song.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {song.lyrics && (
        <div className="bg-black text-white p-6 rounded-lg shadow-md w-full max-w-3xl mb-6">
          <h2 className="text-2xl text-[#b99543] mb-4">Lyrics</h2>
          <p className="whitespace-pre-line">{song.lyrics}</p>
        </div>
      )}

      {song.meanings && (
        <div className="bg-black text-white p-6 rounded-lg shadow-md w-full max-w-3xl">
          <h2 className="text-2xl text-[#b99543] mb-4">Meaning</h2>
          <p>{song.meanings}</p>
        </div>
      )}
    </div>
  );
};
