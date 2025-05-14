import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import Swal from "sweetalert2";
import { useState } from "react";
import SectionTitle from "../../../Components/SectionTItle/SectionTItle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AddBook = () => {
  const axiosPublic = useAxiosPublic();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categoryOptions = [
    { value: "Aqidah", label: "Aqidah" },
    { value: "Hadith", label: "Hadith" },
    { value: "Fiqh", label: "Fiqh" },
    { value: "Tasawwuf", label: "Tasawwuf" },
    { value: "Tawheed", label: "Tawheed" },
    { value: "Quran", label: "Quran" }
  ];

  const formik = useFormik({
    initialValues: {
      title: "",
      categories: [],
      link: "",
      tags: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      categories: Yup.array().min(1, "Select at least one category"),
      link: Yup.string()
        .url("Invalid link format")
        .required("Google Drive link is required"),
      tags: Yup.string().required("Tags are required"),
    }),
    onSubmit: async (values) => {
      const bookItem = {
        title: values.title,
        category: values.categories, // array
        link: values.link,
        tags: values.tags.split(","),
      };

      try {
        const res = await axiosPublic.post("/add-book", bookItem);
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
        console.error("Error adding book:", error);
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
      <SectionTitle heading="Add Book" subHeading="Share Knowledge with the World" />

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
            placeholder="Enter Book Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            className="input input-bordered w-full"
          />
          {formik.touched.title && formik.errors.title ? (
            <div>{formik.errors.title}</div>
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
            <div>{formik.errors.categories}</div>
          ) : null}
        </div>

        {/* Link Input */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="link">
            <span className="label-text">Google Drive Link*</span>
          </label>
          <input
            type="url"
            id="link"
            name="link"
            placeholder="Enter Google Drive Link"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.link}
            className="input input-bordered w-full"
          />
          {formik.touched.link && formik.errors.link ? (
            <div>{formik.errors.link}</div>
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
            <div>{formik.errors.tags}</div>
          ) : null}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn bg-[#f04336] hover:bg-[#f04336] w-full text-white">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
