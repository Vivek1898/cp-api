import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import {
    Routes,
    Route,
    useSearchParams,
    BrowserRouter
  } from "react-router-dom"
const Form = () => {
    const navigate = useNavigate();
    const [Name, setName] = useState('');
    const[Email, setEmail] = useState('');
    const[Profile, setProfile] = useState('');
    const[Leetcode, setLeetcode] = useState('');
    const[CodeForces, setCodeforces] = useState('');
    const[Github, setGithub] = useState('');
    const[UserSearch, setUserSearch] = useState('');
    const[moveToResult, setMoveToResult] = useState('');
    const [showResult, setShowResult] = useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            Name : Name,
            Email : Email,
            Profile : Profile,
            Leetcode : Leetcode,
            CodeForces : CodeForces,
            Github : Github
        };
            
       // console.log(user);
        //return
     try{
      const data=await axios.post(`${import.meta.env.VITE_API}/add-user`,user);
      const UserProfile = data.data.profile;
      setMoveToResult(UserProfile);
      setShowResult(false);
      console.log(data);
     }catch(err){
      toast.error(" User Name Already Exist");
         console.log(err);

     }
      //  alert('You have submitted');
    }
const getUser = async (e) => {
    e.preventDefault();
    const user = {
        profile: UserSearch
    }
    const data=await axios.post(`${import.meta.env.VITE_API}/user`,user);
    console.log(data.data.profile);
    if(data.data.profile){
    const UserProfile = data.data.profile;
    const UserLeetcode = data.data.leetcode;
    const UserCodeforces = data.data.codeforces;
    const UserGithub = data.data.github;
    
    navigate(`profile/${UserProfile}`);
    }else {
      console.log("User Not Found");
    }

}
    return (
        
        <div>


            {showResult ? (    <div>
                <h1  class="font-medium bg-gray-800  leading-tight  text-4xl mt-0  text-white-900 change text-center ">Register to show your profile</h1>
                <div class="bg-gray-800  min-h-screen flex items-center text-lg">
                <form onSubmit={handleSubmit} class="p-10 md:w-2/3 lg:w-1/2 mx-auto rounded">
                  <div class="shadow">
                    <div class="flex items-center bg-gray-400 rounded-t-lg border-gray-500 border-b">
                      <label for="name" class="w-20 text-right mr-8 p-4 text-gray-200">Name</label>
                      <input type="text" name="name" id="name" 
                         onChange={(e) => setName(e.target.value)}
                      placeholder="Put in your name" class="flex-1 p-4 pl-0 bg-transparent placeholder-gray-300  outline-none text-white overflow-ellipsis overflow-hidden"/>
                    </div>
                    <div class="flex items-center bg-gray-400  rounded-b-lg border-gray-500 border-b">
                      <label for="email" class="w-20 text-right p-4 mr-8 text-gray-200">email</label>
                      <input  id='email' 
                     name='email' 
                        value={Email}
                     onChange={(e) => setEmail(e.target.value)}
                      
                      placeholder="Put in email" 
                      
                      class="flex-1 p-4 pl-0 bg-transparent placeholder-gray-300 outline-none text-white overflow-ellipsis overflow-hidden"/>
                    </div>
                    <div class="flex items-center bg-gray-400  rounded-b-lg border-gray-500 border-b">
                      <label for="profile" class="w-20 text-right p-4 mr-8 text-gray-200">Profile</label>
                      <input id='profile' 
                     name='profile' 
                        value={Profile}
                     onChange={(e) => setProfile(e.target.value)}
                      placeholder="Put in Profile username" class="flex-1 p-4 pl-0 bg-transparent placeholder-gray-300 outline-none text-white overflow-ellipsis overflow-hidden"/>
                    </div>
                    <div class="flex items-center bg-gray-400  rounded-b-lg border-gray-500 border-b">
                      <label for="leetcode" class="w-20 text-right p-4 mr-8 text-gray-200">Leetcode</label>
                      <input  type='text'
                     id='leetcode' 
                     name='leetcode' 
                        value={Leetcode}
                     onChange={(e) => setLeetcode(e.target.value)} 
                      placeholder="Put in Leetcode username" class="flex-1 p-4 pl-0 bg-transparent placeholder-gray-300 outline-none text-white overflow-ellipsis overflow-hidden"/>
                    </div>
                    <div class="flex items-center bg-gray-400  rounded-b-lg border-gray-500 border-b">
                      <label for="codeforces" class="w-20 text-right p-4 mr-8 text-gray-200">Codeforces</label>
                      <input  type='text'
                     id='codeforces' 
                     name='codeforces'
                        value={CodeForces} 
                     onChange={(e) => setCodeforces(e.target.value)}
                      placeholder="Put in Codeforces username" class="flex-1 p-4 pl-0 bg-transparent placeholder-gray-300 outline-none text-white overflow-ellipsis overflow-hidden"/>
                    </div>

                    <div class="flex items-center bg-gray-400  rounded-b-lg border-gray-500 border-b">
                      <label for="github" class="w-20 text-right p-4 mr-8 text-gray-200">Github</label>
                      <input  ttype='text'
                     id='github' 
                     name='github'
                     value={Github} 
                     onChange={(e) => setGithub(e.target.value)}
                      placeholder="Put in Github username" class="flex-1 p-4 pl-0 bg-transparent placeholder-gray-300 outline-none text-white overflow-ellipsis overflow-hidden"/>
                    </div>



                  </div>
                  <button type='submit' class="bg-gray-600 block w-full rounded py-4 text-white font-bold shadow">Submit</button>
             
                </form>
              
              </div>
          
            </div>
            
) :(  <div>
    {/* <input type='text'
     id='user' 
     name='user'
     value={UserSearch} 
     onChange={(e) => setUserSearch(e.target.value)}
     />
     <button onClick={getUser}>Get User</button> */}
     <h1  style={{ "padding":"20px"}} class="font-medium bg-gray-800  leading-tight  text-4xl p-30  text-white-900 change text-center ">Registration SuccessFull</h1>
     <div class="bg-gray-800  min-h-screen flex items-center text-lg">
        <Link to={`${moveToResult}`} style={{"margin":"auto", "padding":"20px"}}>
            <button   style={{ "padding":"20px"}} class="bg-gray-600 block w-full rounded py-4 text-white font-bold shadow">Visit Profile</button>
        </Link>
</div>

 
    </div>)}
        
       


                  
        </div>
  );
};

export default Form;