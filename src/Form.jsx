import axios from "axios";
import React, { useState } from "react";
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

    // console.log(user);
    //return
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API}/add-user`,
        user
      );
      const UserProfile = data.data.profile;
      setMoveToResult(UserProfile);
      setShowResult(false);
      console.log(data);
    } catch (err) {
      toast.error(" User Name Already Exist");
      console.log(err);
    }
    //  alert('You have submitted');
  };
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
                    ttype="text"
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
                class="bg-indigo-600 mt-2 block w-full rounded py-4 text-white font-bold shadow"
              >
                Submit
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
