import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState(["All"]); 
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');



  // Fetch blogs.json
  useEffect(() => {
    fetch('http://localhost:5000/all-blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

      // Fetch all categories
  useEffect(() => {
    fetch("http://localhost:5000/categories/blog")
      .then((res) => res.json())
      .then((data) => {
        const fetchedCategories = data.map((item) => item.category);
        setCategories(["All", ...fetchedCategories]);
      });
  }, []);

  // Filtered blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      activeCategory === 'All' || blog.category.includes(activeCategory);
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="flex flex-col items-center px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#b99543] text-center">
          Knowledge Repository
        </h1>
        <div className="h-1 w-12 bg-[#b99543] my-4" />

        {/* Search Bar */}
        <div className="w-full max-w-3xl flex items-center border rounded-full px-4 py-2 mt-6">
          <Search className="text-[#b99543] w-5 h-5" />
          <input
            type="text"
            placeholder="Search knowledge..."
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
        {filteredBlogs.map((blog) => (
        <Link to={`/blog/${blog._id}`} key={blog._id} className="card bg-black shadow-md w-full hover:shadow-lg transition-shadow">
        <div className="card-body">
          <h2 className="card-title text-[#b99543]">{blog.title}</h2>
          <p className="text-white">
            {blog.blog.split('\n').slice(0, 3).join(' ')}...
          </p>
          <div className="justify-start card-actions mt-4 flex flex-wrap gap-2">
            {blog.category.map((cat, index) => (
              <button
                key={index}
                className="btn btn-outline border-[#b99543] text-[#b99543] hover:bg-[#b99543] hover:text-black"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Link>
        ))}
      </div>
    </>
  );
};
