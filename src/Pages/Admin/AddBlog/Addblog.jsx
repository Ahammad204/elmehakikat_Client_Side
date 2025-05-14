import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTItle/SectionTItle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AddBlog = () => {
  const axiosPublic = useAxiosPublic();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosPublic.get('/categories/blog');
        const categoriesData = res.data.map(cat => ({
          value: cat.category,
          label: cat.category
        }));
        setCategoryOptions(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [axiosPublic]);

  const formik = useFormik({
    initialValues: {
      title: "",
      categories: [],
      blog: "",
      tags: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      categories: Yup.array().min(1, "Select at least one category"),
      blog: Yup.string().required("Blog content is required"),
      tags: Yup.string().required("Tags are required"),
    }),
    onSubmit: async (values) => {
      const blogItem = {
        title: values.title,
        category: values.categories, // array
        blog: values.blog,
        tags: values.tags.split(","),
      };

      try {
        const res = await axiosPublic.post("/add-blog", blogItem);
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${values.title} has been added.`,
            showConfirmButton: false,
            timer: 1500,
          });
          formik.resetForm();
          setSelectedCategories([]);
        }
      } catch (error) {
        console.error("Error adding blog:", error);
      }
    },
  });

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    formik.setFieldValue(
      "categories",
      selectedOptions ? selectedOptions.map((opt) => opt.value) : []
    );
  };

  return (
    <div>
      <SectionTitle heading="Add Blog" subHeading="Share Thoughts with the Ummah" />

      <form onSubmit={formik.handleSubmit}>
        {/* Title Input */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="title">
            <span className="label-text">Title*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Blog Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="input input-bordered w-full"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500">{formik.errors.title}</div>
          ) : null}
        </div>

        {/* Categories Select */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="categories">
            <span className="label-text">Categories*</span>
          </label>
          <Select
            id="categories"
            name="categories"
            isMulti
            options={categoryOptions}
            value={selectedCategories}
            onChange={handleCategoryChange}
            onBlur={formik.handleBlur}
            className="react-select"
          />
          {formik.touched.categories && formik.errors.categories ? (
            <div className="text-red-500">{formik.errors.categories}</div>
          ) : null}
        </div>

        {/* Blog Textarea */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="blog">
            <span className="label-text">Blog Content*</span>
          </label>
          <textarea
            id="blog"
            name="blog"
            placeholder="Write your blog here..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.blog}
            className="textarea textarea-bordered w-full"
            rows="10"
          />
          {formik.touched.blog && formik.errors.blog ? (
            <div className="text-red-500">{formik.errors.blog}</div>
          ) : null}
        </div>

        {/* Tags Input */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="tags">
            <span className="label-text">Tags*</span>
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Enter Tags (comma separated)"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tags}
            className="input input-bordered w-full"
          />
          {formik.touched.tags && formik.errors.tags ? (
            <div className="text-red-500">{formik.errors.tags}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn bg-[#f04336] hover:bg-[#f04336] w-full text-white">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
