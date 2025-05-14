
import {  FaUserTie } from "react-icons/fa";

import { useState } from "react";

import { Pagination } from "@mui/material";

import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUser from "../../../Hooks/useUser";


const AllUser = () => {
    const [users, refetch] = useUser()
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const UsersPerPage = 10;

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };



    //Handle Make Admin Status
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success("Role is Update now")
                }
            })
    }



    const offset = (currentPage - 1) * UsersPerPage;
    const currentUsers = users.slice(offset, offset + UsersPerPage);





    return (
        <div>
            <div className="flex justify-evenly my-4">

                <h2 className="text-3xl">Total User: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentUsers?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.photo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user?.name}</td>
                                <td >{user?.email}</td>

                                <td>
                                    <button
                                        onClick={() => handleMakeAdmin(user)}
                                        className="btn btn-ghost btn-lg ">
                                        <FaUserTie className="text-red-600
                                        "></FaUserTie>
                                    </button>

                                </td>
                             



                            </tr>)
                        }

                    </tbody>
                </table>
                {users.length > UsersPerPage && (
                    <div className="join">
                        <Pagination
                            count={Math.ceil(users.length / UsersPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            shape="rounded"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllUser;