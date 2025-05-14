import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Select from "react-select";
import SectionTitle from "../../../Components/SectionTItle/SectionTItle";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]); // For dynamic categories

  // Fetch categories based on section
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:5000/categories/blog`);
        const data = await response.json();
        const categoryOptions = data.map((category) => ({
          value: category.category,
          label: category.category,
        }));
        setCategories(categoryOptions);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch blog data to update
  useEffect(() => {
    fetch(`http://localhost:5000/all-blogs`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item._id === id);
        setBlogData(found);
        setSelectedCategory({
          value: found.category,
          label: found.category,
        });
      });
  }, [id]);

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      tags: "",
      blog: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      category: Yup.string().required("Category is required"),
      tags: Yup.string().required("Tags are required"),
      blog: Yup.string().required("Blog content is required"),
    }),
    onSubmit: async (values) => {
      const updatedBlogItem = {
        title: values.title,
        category: values.category,
        tags: values.tags.split(","),
        blog: values.blog,
      };

      try {
        const res = await fetch(`http://localhost:5000/update-blog/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBlogItem),
        });
        const data = await res.json();
        if (data.message === "Blog updated successfully") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Blog updated successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/all-blogs");
        }
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    },
  });

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    formik.setFieldValue("category", selectedOption.value);
  };

  useEffect(() => {
    if (blogData) {
      // Update formik values when blog data is fetched
      formik.setValues({
        title: blogData.title,
        category: blogData.category,
        tags: blogData.tags.join(", "),
        blog: blogData.blog,
      });
    }
  }, [blogData]);

  if (!blogData || categories.length === 0) {
    return <div className="text-center py-20 text-[#b99543]">Loading...</div>;
  }

  return (
    <div>
      <SectionTitle heading="Update Blog" subHeading="Make Changes to Your Blog" />

      <form onSubmit={formik.handleSubmit}>
        {/* Title Input */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="title">
            <span className="label-text">Title*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Blog Title"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="input input-bordered w-full"
          />
          {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
        </div>

        {/* Category Input (React Select with dynamic options) */}
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

        {/* Blog Input */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="blog">
            <span className="label-text">Blog Content*</span>
          </label>
          <textarea
            placeholder="Enter Blog Content"
            id="blog"
            name="blog"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.blog}
            className="textarea textarea-bordered w-full"
          />
          {formik.touched.blog && formik.errors.blog ? <div>{formik.errors.blog}</div> : null}
        </div>

        {/* Submit Button */}
        <div className="form-control w-full my-6">
          <button type="submit" className="btn btn-primary w-full">
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
