import { Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import axios from 'axios';

const AllBook = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;

    const fetchBooks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/all-books');
            setBooks(res.data);
        } catch (err) {
            console.error('Error fetching books:', err);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This book will be deleted permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#b99543',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/delete-book/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        fetchBooks();
                        Swal.fire('Deleted!', 'The book has been deleted.', 'success');
                    }
                });
            }
        });
    };

    const offset = (currentPage - 1) * booksPerPage;
    const currentBooks = books.slice(offset, offset + booksPerPage);

    return (
        <div className="p-6">
            <h2 className="text-3xl text-[#b99543] font-semibold mb-4">All Books</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Link</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBooks.map((book, index) => (
                            <tr key={book._id}>
                                <td>{offset + index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.category.join(', ')}</td> {/* Join category array into a string */}
                                <td>
                                    <a href={book.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                        View Link
                                    </a>
                                </td>
                                <td>
                                    <Link to={`/dashboard/update-book/${book._id}`}>
                                        <button className="btn btn-ghost btn-lg">
                                            <Pencil className="text-[#b99543]" />
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(book._id)} className="btn btn-ghost btn-lg">
                                        <Trash2 className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {books.length > booksPerPage && (
                <div className="flex justify-center mt-6">
                    <Pagination
                        count={Math.ceil(books.length / booksPerPage)}
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

export default AllBook;
