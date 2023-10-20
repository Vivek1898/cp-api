import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import LoadingCard from "./Loading.jsx";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await axios.get(`${import.meta.env.VITE_API}/users`);
            if (data) {

                setUsers(data.data);
                setLoading(false);
            } else {
                console.log('No User Found');
                setLoading(false);
            }

        } catch (e) {
            setLoading(false);
            console.log(e);

        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Filter users based on the search query
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.profile.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function formatName(name) {
        return name
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <div>
            <h1 className="text-2xl text-white text-center my-4">T<span
                className="text-yellow-600 dark:text-yellow-600">O</span>P Profiles</h1>
            <div className="p-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by name, email, or username"
                    className="w-3/4 p-2 rounded-lg border border-white text-white bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {!loading ?   <table className="w-3/4 mx-auto text-white rounded-lg p-4">
                <thead>
                <tr>
                    <th className="px-4 py-2 text-yellow-600">Name</th>
                    <th className="px-4 py-2 text-yellow-600">Profile</th>
                    <th className="px-4 py-2 text-yellow-600">Link</th>
                </tr>
                </thead>
                <tbody>
                { filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{formatName(user.name)}</td>
                            <td className="border px-4 py-2">{user.profile}</td>
                            <td className="border px-4 py-2 text-center">
                                <Link
                                    to={`/profile/${user.profile}`}
                                    className="text-yellow-600 hover:underline"
                                >
                                    Profile
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="text-center">
                            No users found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table> : (<> <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 change md:text-4xl text-white text-center ">
                {" "}
                <LoadingCard class="text-six" count={3}/>
            </h1></>)}

        </div>
    );
};

export default Users;
