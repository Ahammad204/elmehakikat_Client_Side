import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Tawheed', 'Tasawwuf', 'Fiqh', 'Hadith', 'Aqidah','quran'];

  // Fetch books.json
  useEffect(() => {
    fetch('http://localhost:5000/all-books')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // Filtered books
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      activeCategory === 'All' || book.category.includes(activeCategory);
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="flex flex-col items-center px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#b99543] text-center">
          Book Collection
        </h1>
        <div className="h-1 w-12 bg-[#b99543] my-4" />

        {/* Search Bar */}
        <div className="w-full max-w-3xl flex items-center border rounded-full px-4 py-2 mt-6">
          <Search className="text-[#b99543] w-5 h-5" />
          <input
            type="text"
            placeholder="Search books..."
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
                  ? 'bg-[#b99543] text-black'
                  : 'bg-white text-gray-400 border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-10">
        {filteredBooks.map((book) => (
          <a
            key={book.id}
            href={book.link} // Redirects to the external link (e.g., Google Drive link)
            target="_blank" // Open in a new tab
            rel="noopener noreferrer" // Security measure for opening external links
            className="card bg-black shadow-md w-full hover:shadow-lg transition-shadow"
          >
            <div className="card-body">
              <h2 className="card-title text-[#b99543]">{book.title}</h2>
              <p className="text-white">
                {book.title}
              </p>
              <div className="justify-start card-actions mt-4 flex flex-wrap gap-2">
                {book.category.map((cat, index) => (
                  <button
                    key={index}
                    className="btn btn-outline border-[#b99543] text-[#b99543] hover:bg-[#b99543] hover:text-black"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};
