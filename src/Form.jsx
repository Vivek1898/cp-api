import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
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
        const data=await axios.post(`${import.meta.env.VITE_API}/add-user`,user);
        const UserProfile = data.data.profile;
        setMoveToResult(UserProfile);
        setShowResult(false);
        console.log(data);
      //  alert('You have submitted');
    }
const getUser = async (e) => {
    e.preventDefault();
    const user = {
        profile: UserSearch
    }
    const data=await axios.post(`${import.meta.env.VITE_API}/user`,user);
    console.log(data.data.profile);
    const UserProfile = data.data.profile;
    const UserLeetcode = data.data.leetcode;
    const UserCodeforces = data.data.codeforces;
    const UserGithub = data.data.github;
    
    navigate(`${UserProfile}`);
   

}
    return (
        
        <div>

            {showResult ? (    <form className='form' onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='Name'>Name: </label>
                    <input
                        type='text'
                        id='Name'
                        name='Name'
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='email'>Email: </label>
                    <input type='text'
                     id='email' 
                     name='email' 
                        value={Email}
                     onChange={(e) => setEmail(e.target.value)}
                     />
                </div>


                <div className='form-control'>
                    <label htmlFor='profile'>Profile: </label>
                    <input type='text'
                     id='profile' 
                     name='profile' 
                        value={Profile}
                     onChange={(e) => setProfile(e.target.value)}
                     />
                </div>


                <div className='form-control'>
                    <label htmlFor='leetcode'>Leetcode: </label>
                    <input type='text'
                     id='leetcode' 
                     name='leetcode' 
                        value={Leetcode}
                     onChange={(e) => setLeetcode(e.target.value)}
                     />
                </div>


                <div className='form-control'>
                    <label htmlFor='codeforces'>Codeforces: </label>
                    <input type='text'
                     id='codeforces' 
                     name='codeforces'
                        value={CodeForces} 
                     onChange={(e) => setCodeforces(e.target.value)}
                     />
                </div>

                <div className='form-control'>
                    <label htmlFor='github'>Github: </label>
                    <input type='text'
                     id='github' 
                     name='github'
                     value={Github} 
                     onChange={(e) => setGithub(e.target.value)}
                     />
                </div>

                <button type='submit'>Submit</button>
            </form>
            
) :(  <div>
    <input type='text'
     id='user' 
     name='user'
     value={UserSearch} 
     onChange={(e) => setUserSearch(e.target.value)}
     />
     <button onClick={getUser}>Get User</button>

        <Link to={`/${moveToResult}`}>
            <button>Move</button>
        </Link>
    </div>)}
        
       


                  
        </div>
  );
};

export default Form;