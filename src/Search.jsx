import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Search = () => {
  const navigate = useNavigate();
  const [UserSearch, setUserSearch] = useState("");
  const[isSearching,SetIsSearchIng]=useState(false);
  const getUser = async (e) => {
    e.preventDefault();
    const user = {
      profile: UserSearch.toLowerCase(),
    };
    try {
      SetIsSearchIng(true);
      // toast('🦄 Wow so easy!', {
      //   position: "bottom-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   });
      const data = await axios.post(`${import.meta.env.VITE_API}/user`, user);
      //    console.log(data);
      //  console.log(data.status)

      //  console.log(data.data.profile);
      const UserProfile = data.data.profile;
      // const UserLeetcode = data.data.leetcode;
      // const UserCodeforces = data.data.codeforces;
      // const UserGithub = data.data.github;

      navigate(`${UserProfile}`);
      SetIsSearchIng(false);
    } catch (err) {
    //  console.log(err);
    //  console.log("User Not Found");
      toast.error("User Not Found");
      SetIsSearchIng(false);
    }
  };
  return (
    <div>
      <div class="min-h-screen ">
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
              {isSearching ? (           <div role="">
    <svg aria-hidden="true" class="w-8 h-8  text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>):( <i class="mdi mdi-magnify"></i>)}
             
   
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
