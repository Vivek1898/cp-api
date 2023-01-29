import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Form = () => {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Profile, setProfile] = useState("");
  const [Leetcode, setLeetcode] = useState("");
  const [CodeForces, setCodeforces] = useState("");
  const [Github, setGithub] = useState("");
  const [UserSearch, setUserSearch] = useState("");
  const [moveToResult, setMoveToResult] = useState("");
  const [showResult, setShowResult] = useState(true);
  const[isSearching,SetIsSearchIng]=useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      Name: Name.toLowerCase(),
      Email: Email.toLowerCase(),
      Profile: Profile.toLowerCase(),
      Leetcode: Leetcode.toLowerCase(),
      CodeForces: CodeForces.toLowerCase(),
      Github: Github.toLowerCase(),
    };
if(!Name){
  toast.error("Name is Required");
  return
}else if(!Email){
  toast.error("Email is Required");
  return
}else if(!Profile){
  toast.error("Profile is Required");
  return

}
    // console.log(user);
    //return
    try {
      SetIsSearchIng(true);
      const data = await axios.post(
        `${import.meta.env.VITE_API}/add-user`,
        user
      );
      const UserProfile = data.data.profile;
      setMoveToResult(UserProfile);
      setShowResult(false);
      SetIsSearchIng(false);
      //console.log(data);
    } catch (err) {
      toast.error(" User Name Already Exist");
      SetIsSearchIng(false);
      console.log(err);
    }
    //  alert('You have submitted');
  };
  const Move = () =>{
    navigate(`${moveToResult}`);
  }

  const startServer = async()=>{
    try {
      const data = await axios.post(`${import.meta.env.VITE_API}`);
     // console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
 useEffect(()=>{

startServer();
  }
  ,[])


  const getUser = async (e) => {
    e.preventDefault();
    const user = {
      profile: UserSearch,
    };
    const data = await axios.post(`${import.meta.env.VITE_API}/user`, user);
    //  console.log(data.data.profile);
    if (data.data.profile) {
      const UserProfile = data.data.profile;
      const UserLeetcode = data.data.leetcode;
      const UserCodeforces = data.data.codeforces;
      const UserGithub = data.data.github;

      navigate(`profile/${UserProfile}`);
    } else {
      console.log("User Not Found");
    }
  };
  return (
    <div>
      {showResult ? (
        <div class=" min-h-screen ">
          <h1 class="text-center font-bold text-white p-10 mb-0 text-4xl change text-center ">
            Register to show your{" "}
            <span class="text-yellow-600 dark:text-yellow-600">Profile </span>
          </h1>
          <div class="  flex items-center text-lg">
            <form
            style={{margin:"auto"}}
              onSubmit={handleSubmit}
              class="p-1  overflow-hidden resize-x min-w-80 max-w-3xl rounded"
            >
              <div class="shadow">
                <div class="flex items-center  rounded-t-lg border-gray-500 border-b">
                  <label
                    for="name"
                    class="w-20 text-right mr-8 p-4 text-yellow-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="your name"
                    class="placeholder:italic flex-1 p-4 pl-0 bg-transparent placeholder-gray-300  outline-none text-white overflow-ellipsis overflow-hidden"
                  />
                </div>
                <div class="flex items-center   rounded-b-lg border-gray-500 border-b">
                  <label
                    for="email"
                    class="w-20 text-right p-4 mr-8 text-yellow-600"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    class="placeholder:italic flex-1 p-4 pl-0 bg-transparent placeholder-gray-300 outline-none text-white overflow-ellipsis overflow-hidden"
                  />
                </div>
                <div class="flex items-center   rounded-b-lg border-gray-500 border-b">
                  <label
                    for="profile"
                    class="w-20 text-right p-4 mr-8 text-yellow-600"
                  >
                    Profile
                  </label>
                  <input
                    id="profile"
                    name="profile"
                    value={Profile}
                    onChange={(e) => setProfile(e.target.value)}
                    placeholder="unique username"
                    class="flex-1 p-4 pl-0 bg-transparent placeholder-gray-300 outline-none text-white overflow-ellipsis overflow-hidden"
                  />
                </div>
                <div class="placeholder:italic flex items-center   rounded-b-lg border-gray-500 border-b">
                  <label
                    for="leetcode"
                    class="w-20 text-right p-4 mr-8 text-yellow-600"
                  >
                    Leetcode
                  </label>
                  <input
                    type="text"
                    id="leetcode"
                    name="leetcode"
                    value={Leetcode}
                    onChange={(e) => setLeetcode(e.target.value)}
                    placeholder="leetcode username"
                    class="placeholder:italic flex-1 p-4 pl-0 bg-transparent placeholder-gray-300 outline-none text-white overflow-ellipsis overflow-hidden"
                  />
                </div>
                <div class="flex items-center   rounded-b-lg border-gray-500 border-b">
                  <label
                    for="codeforces"
                    class="w-20 text-right p-4 mr-8 text-yellow-600"
                  >
                    Codeforces
                  </label>
                  <input
                    type="text"
                    id="codeforces"
                    name="codeforces"
                    value={CodeForces}
                    onChange={(e) => setCodeforces(e.target.value)}
                    placeholder="codeforces username"
                    class=" placeholder:italic flex-1 p-4 pl-0 bg-transparent placeholder-gray-300 outline-none text-white overflow-ellipsis overflow-hidden"
                  />
                </div>

                <div class="flex items-center   rounded-b-lg border-gray-500 border-b">
                  <label
                    for="github"
                    class="w-20 text-right p-4 mr-8  text-yellow-600"
                  >
                    Github
                  </label>
                  <input
                    type="text"
                    id="github"
                    name="github"
                    value={Github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="github username"
                    class="placeholder:italic flex-1 p-4 pl-0 bg-transparent placeholder-gray-300 outline-none text-white overflow-ellipsis overflow-hidden"
                  />
                </div>
              </div>
              <button
               
                type="submit"
                class="bg-indigo-600  mt-2 block w-full rounded py-4 text-white font-bold shadow"
              >
                     {isSearching ? (           <div role="status" class="text-center loaderSubmit" style={{margin:"auto"}}>
    <svg aria-hidden="true" class="w-8 h-8  text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>):( "Submit")}
               
              </button>
              {/* <div class=" top-0 left-0 w-full h-2 flex">
                <div class="h-2 bg-blue-500 flex-1"></div>
                <div class="h-2 bg-red-500 flex-1"></div>
                <div class="h-2 bg-yellow-500 flex-1"></div>
                <div class="h-2 bg-blue-500 flex-1"></div>
                <div class="h-2 bg-green-500 flex-1"></div>
                <div class="h-2 bg-red-500 flex-1"></div>
              </div> */}
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h1
            style={{ padding: "20px" }}
            class="font-medium   leading-tight  text-4xl p-30  text-white-900 change text-center "
          >
            Registration{" "}
            <span class="text-yellow-600 dark:text-yellow-600">Successfull </span>
          </h1>
          <div class="  min-h-screen flex items-center text-lg">
            <Link
              to={`${moveToResult}`}
              style={{ margin: "auto", padding: "20px" }}
            >
              <button
                style={{ padding: "20px" }}
                class="bg-gray-600  block w-full rounded py-4 text-white font-bold shadow"
              >
                Visit Profile{" "}
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
