import { useState, useEffect } from "react";
import axios from "axios";

export default function MultiCategoryManager() {
  const [selectedSection, setSelectedSection] = useState("blog");
  const [categories, setCategories] = useState({ blog: [], song: [], book: [] });
  const [newCategory, setNewCategory] = useState("");

  // Fetch categories when section changes
  useEffect(() => {
    fetchCategories(selectedSection);
  }, [selectedSection]);

  // Fetch categories from server
  const fetchCategories = async (section) => {
    try {
      const response = await axios.get(`http://localhost:5000/categories/${section}`);
      const categoryNames = response.data.map(item => item.category);
      setCategories(prev => ({
        ...prev,
        [section]: categoryNames,
      }));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Add new category
  const addCategory = async () => {
    const trimmedCategory = newCategory.trim();
    if (!trimmedCategory || categories[selectedSection].includes(trimmedCategory)) return;

    try {
      await axios.post("http://localhost:5000/add-category", {
        section: selectedSection,
        category: trimmedCategory,
      });
      fetchCategories(selectedSection); // Refresh list
      setNewCategory("");
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  // Delete category
  const deleteCategory = async (categoryToDelete) => {
    try {
      // First, find the category _id to delete
      const response = await axios.get(`http://localhost:5000/categories/${selectedSection}`);
      const found = response.data.find(item => item.category === categoryToDelete);

      if (found) {
        await axios.delete(`http://localhost:5000/delete-category/${found._id}`);
        fetchCategories(selectedSection); // Refresh list
      }
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center">Manage Categories by Section</h2>

      {/* Section Selector */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setSelectedSection('blog')}
          className={`px-4 py-2 rounded ${selectedSection === 'blog' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Blog
        </button>
        <button
          onClick={() => setSelectedSection('song')}
          className={`px-4 py-2 rounded ${selectedSection === 'song' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Song
        </button>
        <button
          onClick={() => setSelectedSection('book')}
          className={`px-4 py-2 rounded ${selectedSection === 'book' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Book
        </button>
      </div>

      {/* Add New Category */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder={`Enter new ${selectedSection} category`}
          className="flex-grow border rounded px-3 py-2"
        />
        <button onClick={addCategory} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add
        </button>
      </div>

      {/* Display Categories */}
      <ul className="space-y-2">
        {categories[selectedSection]?.map((category, index) => (
          <li key={index} className="flex justify-between items-center border-b pb-1">
            <span>{category}</span>
            {category !== "All" && (
              <button
                onClick={() => deleteCategory(category)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
