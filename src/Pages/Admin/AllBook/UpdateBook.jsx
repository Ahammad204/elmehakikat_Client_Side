import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Select from "react-select";
import SectionTitle from "../../../Components/SectionTItle/SectionTItle";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]); // New state to hold categories

  // Fetch book data to update
  useEffect(() => {
    fetch(`http://localhost:5000/all-books`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item._id === id);
        setBookData(found);
        setSelectedCategory({
          value: found.category[0], // assuming the category is an array
          label: found.category[0], // category is an array, using the first element
        });
      });
  }, [id]);

  // Fetch categories for books section
  useEffect(() => {
    fetch("http://localhost:5000/categories/book")
      .then((res) => res.json())
      .then((data) => {
        const categoryOptions = data.map((category) => ({
          value: category.category,
          label: category.category,
        }));
        setCategories(categoryOptions);
      });
  }, []);

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      link: "",
      tags: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      category: Yup.string().required("Category is required"),
      link: Yup.string().required("Link is required"),
      tags: Yup.string().required("Tags are required"),
    }),
    onSubmit: async (values) => {
      const updatedBookItem = {
        title: values.title,
        category: [values.category], // storing category as an array
        link: values.link,
        tags: values.tags.split(",").map((tag) => tag.trim()), // splitting tags by commas
      };

      try {
        const res = await fetch(`http://localhost:5000/update-book/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBookItem),
        });
        const data = await res.json();
        if (data.message === "Book updated successfully") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Book updated successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/all-book");
        }
      } catch (error) {
        console.error("Error updating book:", error);
      }
    },
  });

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    formik.setFieldValue("category", selectedOption.value);
  };

  useEffect(() => {
    if (bookData) {
      // Update formik values when book data is fetched
      formik.setValues({
        title: bookData.title,
        category: bookData.category[0], // Assuming first category for simplicity
        link: bookData.link,
        tags: bookData.tags.join(", "), // Assuming tags are an array, joining them
      });
    }
  }, [bookData]);

  if (!bookData || categories.length === 0) {
    return <div className="text-center py-20 text-[#b99543]">Loading...</div>;
  }

  return (
    <div>
      <SectionTitle heading="Update Book" subHeading="Make Changes to Your Book" />

      <form onSubmit={formik.handleSubmit}>
        {/* Title Input */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="title">
            <span className="label-text">Title*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Book Title"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="input input-bordered w-full"
          />
          {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
        </div>

        {/* Category Input (React Select) */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="category">
            <span className="label-text">Category*</span>
          </label>
          <Select
            id="category"
            name="category"
            options={categories}
            value={selectedCategory}
            onChange={handleCategoryChange}
          />
          {formik.touched.category && formik.errors.category ? <div>{formik.errors.category}</div> : null}
        </div>

        {/* Link Input */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="link">
            <span className="label-text">Link*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Book Link"
            id="link"
            name="link"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.link}
            className="input input-bordered w-full"
          />
          {formik.touched.link && formik.errors.link ? <div>{formik.errors.link}</div> : null}
        </div>

        {/* Tags Input */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="tags">
            <span className="label-text">Tags*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Tags (comma separated)"
            id="tags"
            name="tags"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tags}
            className="input input-bordered w-full"
          />
          {formik.touched.tags && formik.errors.tags ? <div>{formik.errors.tags}</div> : null}
        </div>

        {/* Submit Button */}
        <div className="form-control w-full my-6">
          <button type="submit" className="btn btn-primary w-full">
            Update Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
