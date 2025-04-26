import { useFormik } from 'formik';
import * as Yup from 'yup';

import Select from 'react-select';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useState } from 'react';
import SectionTitle from '../../../Components/SectionTItle/SectionTItle';

// Your component
const AddMusic = () => {
    const axiosPublic = useAxiosPublic();
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Formik initialization
    const formik = useFormik({
        initialValues: {
            title: '',
            category: '',
            audio: '',
            tags: '',
            lyrics: '',
            meanings: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            category: Yup.string().required('Category is required').matches(/^(Nasheed|Spiritual|Classical|Instrumental|Devotional)$/, 'Invalid category'),
            audio: Yup.string().required('Audio URL is required'),
            tags: Yup.string().required('Tags are required'),
            lyrics: Yup.string().required('Lyrics are required'),
            meanings: Yup.string().required('Meanings are required'),
        }),

        onSubmit: async (values) => {
            // Here you can send the data to your MongoDB server or API
            console.log('Form data submitted:', values);
            const musicItem = {
                title: values.title,
                category: values.category,
                audioUrl: values.audio, 
                tags: values.tags.split(','),
                lyrics: values.lyrics,
                meanings: values.meanings,
              };
              

            // Send the music data to the server
            try {
                const musicRes = await axiosPublic.post('/add-music', musicItem);
                console.log(musicRes.data);

                if (musicRes.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${values.title} has been added.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } catch (error) {
                console.error('Error adding music:', error);
            }
        },
    });

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
        formik.setFieldValue('category', selectedOption.value);
    };

    return (
        <div>
            <SectionTitle heading="Add Music" subHeading="Enrich the World with Music" />

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
                    {formik.touched.title && formik.errors.title ? (
                        <div>{formik.errors.title}</div>
                    ) : null}
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
                            { value: 'Nasheed', label: 'Nasheed' },
                            { value: 'Spiritual', label: 'Spiritual' },
                            { value: 'Classical', label: 'Classical' },
                            { value: 'Instrumental', label: 'Instrumental' },
                            { value: 'Devotional', label: 'Devotional' },
                        ]}
                        onChange={handleCategoryChange}
                        onBlur={formik.handleBlur}
                        value={selectedCategory}
                        className="react-select"
                    />
                    {formik.touched.category && formik.errors.category ? (
                        <div>{formik.errors.category}</div>
                    ) : null}
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
                    {formik.touched.audio && formik.errors.audio ? (
                        <div>{formik.errors.audio}</div>
                    ) : null}
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
                    {formik.touched.tags && formik.errors.tags ? (
                        <div>{formik.errors.tags}</div>
                    ) : null}
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
                    {formik.touched.lyrics && formik.errors.lyrics ? (
                        <div>{formik.errors.lyrics}</div>
                    ) : null}
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
                    {formik.touched.meanings && formik.errors.meanings ? (
                        <div>{formik.errors.meanings}</div>
                    ) : null}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn bg-[#f04336] hover:bg-[#f04336] w-full text-white">
                    Add Music
                </button>
            </form>
        </div>
    );
};

export default AddMusic;
