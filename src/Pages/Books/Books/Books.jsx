import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch books.json
  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  // Fetch all categories
  useEffect(() => {
    fetch("http://localhost:5000/categories/book")
      .then((res) => res.json())
      .then((data) => {
        const fetchedCategories = data.map((item) => item.category);
        setCategories(["All", ...fetchedCategories]);
      });
  }, []);

  // Filtered books
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      activeCategory === "All" || book.category.includes(activeCategory);
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="flex flex-col items-center   px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#b99543] text-center">
          Beneficial Books
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
                  ? "bg-[#b99543] text-black"
                  : "bg-white text-gray-400 border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-10 mb-20">
        {filteredBooks.map((book) => (
          <a
            key={book.id}
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl overflow-hidden shadow-md w-full hover:shadow-lg transition-transform hover:scale-105 bg-white"
          >
            {/* Card Header */}
            <div className="bg-[#b99543] p-4  text-center items-center">
              <h2 className="text-lg font-bold text-center text-black">
                {book.title}
              </h2>
            </div>

            {/* Card Body */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white py-10">
              <div className="text-[#b99543] text-5xl">📖</div>
            </div>

            {/* Card Footer */}
            <div className="p-4">
              {/* Published and Updated Dates */}
              <p className="text-lg text-gray-500 mb-1">
                Published On :  
                 { book.addedAt
                  ? new Date(book.addedAt).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-lg text-gray-500 mb-4">
                Updated At :
                {book.updatedAt
                  ? new Date(book.updatedAt).toLocaleDateString()
                  : "Not updated yet"}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {book.category.map((cat, index) => (
                  <button
                    key={index}
                    className="bg-[#efe2c7] text-[#b99543] text-xs font-semibold px-3 py-1 rounded-full"
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
