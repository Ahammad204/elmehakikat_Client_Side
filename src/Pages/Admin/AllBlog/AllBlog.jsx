import { Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import axios from 'axios';

const AllBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 10;

    // Fetch all blogs from the backend
    const fetchBlogs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/all-blogs');
            setBlogs(res.data);
        } catch (err) {
            console.error('Error fetching blogs:', err);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Handle blog delete
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This blog will be deleted permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#b99543',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/delete-blog/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        fetchBlogs();
                        Swal.fire('Deleted!', 'The blog has been deleted.', 'success');
                    }
                });
            }
        });
    };

    const offset = (currentPage - 1) * blogsPerPage;
    const currentBlogs = blogs.slice(offset, offset + blogsPerPage);

    return (
        <div className="p-6">
            <h2 className="text-3xl text-[#b99543] font-semibold mb-4">All Blogs</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Blog</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBlogs.map((blog, index) => (
                            <tr key={blog._id}>
                                <td>{offset + index + 1}</td>
                                <td>{blog.title}</td>
                                <td>{blog.category.join(', ')}</td> {/* Join category array into a string */}
                                <td>
                                    <a
                                        href={`/blog/${blog._id}`} 
                                        className="text-blue-500"
                                    >
                                        View Blog
                                    </a>
                                </td>
                                <td>
                                    <Link to={`/dashboard/update-blog/${blog._id}`}>
                                        <button className="btn btn-ghost btn-lg">
                                            <Pencil className="text-[#b99543]" />
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(blog._id)} className="btn btn-ghost btn-lg">
                                        <Trash2 className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {blogs.length > blogsPerPage && (
                <div className="flex justify-center mt-6">
                    <Pagination
                        count={Math.ceil(blogs.length / blogsPerPage)}
                        page={currentPage}
                        onChange={(e, page) => setCurrentPage(page)}
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            )}
        </div>
    );
};

export default AllBlog;
