import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export const Music = () => {
  const [songs, setSongs] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

<<<<<<< HEAD
  const categories = ['All', 'Nasheed', 'Instrumental', 'Spiritual', 'Classical', 'Devotional'];
=======
  // const categories = ['All', 'Nasheed', 'Instrumental', 'Spiritual', 'Classical', 'Devotional'];
>>>>>>> 045299524a4689c971ccff2c64958c52e89c8901

  useEffect(() => {
    fetch("http://localhost:5000/all-music") // Change to your deployed backend URL if needed
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Error fetching music:", err));
  }, []);

  // Fetch all categories
  useEffect(() => {
    fetch("http://localhost:5000/categories/song")
      .then((res) => res.json())
      .then((data) => {
        const fetchedCategories = data.map((item) => item.category);
        setCategories(["All", ...fetchedCategories]);
      });
  }, []);

  const filteredSongs = songs.filter((song) => {
    const matchesCategory =
      activeCategory === "All" || song.category === activeCategory;
    const matchesSearch = song.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="flex flex-col items-center px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#b99543] text-center">
          Music Library
        </h1>
        <div className="h-1 w-12 bg-[#b99543] my-4" />

        {/* Search Bar */}
        <div className="w-full max-w-3xl flex items-center border rounded-full px-4 py-2 mt-6">
          <Search className="text-[#b99543] w-5 h-5" />
          <input
            type="text"
            placeholder="Search music..."
            className="flex-1 outline-none px-3 py-1 bg-transparent text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full border text-sm md:text-base ${
                activeCategory === category
                  ? "bg-[#b99543] text-black"
                  : "bg-white text-gray-400 border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Songs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-10">
        {filteredSongs.map((song) => (
          <Link
            to={`/music/${song._id}`}
            key={song._id}
            className="card bg-black shadow-md w-full hover:shadow-lg transition-shadow p-4"
          >
            <h2 className="text-[#b99543] text-xl font-semibold mb-2">
              {song.title}
            </h2>
            <audio controls className="w-full mb-3">
              <source src={song.audioUrl || song.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="flex flex-wrap gap-2">
              <span className="btn btn-outline border-[#b99543] text-[#b99543] hover:bg-[#b99543] hover:text-black">
                {song.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
