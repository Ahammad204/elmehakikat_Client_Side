import { Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import axios from 'axios';

const AllMusic = () => {
    const [songs, setSongs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const songsPerPage = 10;

    const fetchSongs = async () => {
        try {
            const res = await axios.get('http://localhost:5000/all-music');
            setSongs(res.data);
        } catch (err) {
            console.error('Error fetching songs:', err);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This music will be deleted permanently!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#b99543',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/delete-music/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        fetchSongs();
                        Swal.fire('Deleted!', 'The music has been deleted.', 'success');
                    }
                });
            }
        });
    };

    const offset = (currentPage - 1) * songsPerPage;
    const currentSongs = songs.slice(offset, offset + songsPerPage);

    return (
        <div className="p-6 ">
            <h2 className="text-3xl text-[#b99543] font-semibold mb-4">All Music</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Audio</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSongs.map((song, index) => (
                            <tr key={song._id}>
                                <td>{offset + index + 1}</td>
                                <td>{song.title}</td>
                                <td>{song.category}</td>
                                <td>
                                    <audio controls className="w-full mb-3">
                                        <source src={song.audioUrl || song.audio} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </td>
                                <td>
                                    <Link to={`/dashboard/update-music/${song._id}`}>
                                        <button className="btn btn-ghost btn-lg">
                                            <Pencil className="text-[#b99543]" />
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(song._id)} className="btn btn-ghost btn-lg">
                                        <Trash2 className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {songs.length > songsPerPage && (
                <div className="flex justify-center mt-6 ">
                    <Pagination
                        count={Math.ceil(songs.length / songsPerPage)}
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

export default AllMusic;
