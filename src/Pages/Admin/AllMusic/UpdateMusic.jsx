import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Select from "react-select";
import SectionTitle from "../../../Components/SectionTItle/SectionTItle";

const UpdateMusic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [musicData, setMusicData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch music data to update
  useEffect(() => {
    fetch(`http://localhost:5000/all-music`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item._id === id);
        setMusicData(found);
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
      audio: "",
      tags: "",
      lyrics: "",
      meanings: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      category: Yup.string().required("Category is required").matches(/^(Nasheed|Spiritual|Classical|Instrumental|Devotional)$/, "Invalid category"),
      audio: Yup.string().required("Audio URL is required"),
      tags: Yup.string().required("Tags are required"),
      lyrics: Yup.string().required("Lyrics are required"),
      meanings: Yup.string().required("Meanings are required"),
    }),
    onSubmit: async (values) => {
      const updatedMusicItem = {
        title: values.title,
        category: values.category,
        audioUrl: values.audio,
        tags: values.tags.split(","),
        lyrics: values.lyrics,
        meanings: values.meanings,
      };

      try {
        const res = await fetch(`http://localhost:5000/update-music/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedMusicItem),
        });
        const data = await res.json();
        if (data.message === "Music updated successfully") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Music updated successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/all-music");
        }
      } catch (error) {
        console.error("Error updating music:", error);
      }
    },
  });

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    formik.setFieldValue("category", selectedOption.value);
  };

  useEffect(() => {
    if (musicData) {
      // Update formik values when music data is fetched
      formik.setValues({
        title: musicData.title,
        category: musicData.category,
        audio: musicData.audioUrl,
        tags: musicData.tags.join(", "),
        lyrics: musicData.lyrics,
        meanings: musicData.meanings,
      });
    }
  }, [musicData]);

  if (!musicData) {
    return <div className="text-center py-20 text-[#b99543]">Loading...</div>;
  }

  return (
    <div>
      <SectionTitle heading="Update Music" subHeading="Make Changes to Your Music" />

      <form onSubmit={formik.handleSubmit}>
        {/* Title Input */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="title">
            <span className="label-text">Title*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Music Title"
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
            options={[
              { value: "Nasheed", label: "Nasheed" },
              { value: "Spiritual", label: "Spiritual" },
              { value: "Classical", label: "Classical" },
              { value: "Instrumental", label: "Instrumental" },
              { value: "Devotional", label: "Devotional" },
            ]}
            onChange={handleCategoryChange}
            onBlur={formik.handleBlur}
            value={selectedCategory}
            className="react-select"
          />
          {formik.touched.category && formik.errors.category ? <div>{formik.errors.category}</div> : null}
        </div>

        {/* Audio URL Input */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="audio">
            <span className="label-text">Audio URL*</span>
          </label>
          <input
            type="url"
            placeholder="Enter Audio URL"
            id="audio"
            name="audio"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.audio}
            className="input input-bordered w-full"
          />
          {formik.touched.audio && formik.errors.audio ? <div>{formik.errors.audio}</div> : null}
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

        {/* Lyrics Input */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="lyrics">
            <span className="label-text">Lyrics*</span>
          </label>
          <textarea
            id="lyrics"
            name="lyrics"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lyrics}
            className="textarea textarea-bordered w-full"
            placeholder="Enter Lyrics"
          />
          {formik.touched.lyrics && formik.errors.lyrics ? <div>{formik.errors.lyrics}</div> : null}
        </div>

        {/* Meanings Input */}
        <div className="form-control w-full my-6">
          <label className="label" htmlFor="meanings">
            <span className="label-text">Meanings*</span>
          </label>
          <textarea
            id="meanings"
            name="meanings"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.meanings}
            className="textarea textarea-bordered w-full"
            placeholder="Enter Meanings"
          />
          {formik.touched.meanings && formik.errors.meanings ? <div>{formik.errors.meanings}</div> : null}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn bg-[#f04336] hover:bg-[#f04336] w-full text-white">
          Update Music
        </button>
      </form>
    </div>
  );
};

export default UpdateMusic;
