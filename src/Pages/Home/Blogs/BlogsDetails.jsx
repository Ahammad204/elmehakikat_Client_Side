import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export const BlogsDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch('/blog.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setBlog(found);
      });
  }, [id]);

  if (!blog) return <div className="p-10 text-center text-gray-600">Loading blog...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/" className="text-[#b99543] underline mb-4 inline-block">← Back to Blogs</Link>

      <h1 className="text-3xl font-bold text-[#b99543] mb-4">{blog.title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {blog.category.map((cat, index) => (
          <span key={index} className="px-3 py-1 bg-[#b99543] text-black rounded-full text-sm">
            {cat}
          </span>
        ))}
      </div>

      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
        {blog.blog}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        Tags: {blog.tags.join(', ')}
      </div>
    </div>
  );
};
