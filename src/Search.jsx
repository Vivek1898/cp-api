import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Search = () => {
  const navigate = useNavigate();
  const [UserSearch, setUserSearch] = useState("");
  const getUser = async (e) => {
    e.preventDefault();
    const user = {
      profile: UserSearch.toLowerCase(),
    };
    try {
      const data = await axios.post(`${import.meta.env.VITE_API}/user`, user);
      //    console.log(data);
      //  console.log(data.status)

      //  console.log(data.data.profile);
      const UserProfile = data.data.profile;
      // const UserLeetcode = data.data.leetcode;
      // const UserCodeforces = data.data.codeforces;
      // const UserGithub = data.data.github;

      navigate(`${UserProfile}`);
    } catch (err) {
    //  console.log(err);
    //  console.log("User Not Found");
      toast.error("User Not Found");
    }
  };
  return (
    <div>
      <div class="">
        <h1 class="text-center font-bold text-white p-10 mb-40 text-4xl">
          Find Your{" "}
          <span class="text-yellow-600 dark:text-yellow-600">Profile </span>
        </h1>
        <div class="w-full mx-auto rounded-xl bg-gray-100 shadow-lg p-10 text-gray-800 relative overflow-hidden resize-x min-w-80 max-w-3xl">
          <div class="relative mt-1">
            <input
              type="text"
              class="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Search..."
              onChange={(e) => {
                setUserSearch(e.target.value);
              }}
              onKeyPress={(e) => {  if(e.key === "Enter") { getUser(e); } } }
            />
            <button
              onClick={getUser}
              class="block w-7 h-7 text-center  text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors"
            >
              <i class="mdi mdi-magnify"></i>
            </button>
          </div>
          <div class="absolute top-0 left-0 w-full h-2 flex">
            <div class="h-2 bg-blue-500 flex-1"></div>
            <div class="h-2 bg-red-500 flex-1"></div>
            <div class="h-2 bg-yellow-500 flex-1"></div>
            <div class="h-2 bg-blue-500 flex-1"></div>
            <div class="h-2 bg-green-500 flex-1"></div>
            <div class="h-2 bg-red-500 flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
