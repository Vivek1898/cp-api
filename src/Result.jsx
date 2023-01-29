//import { useState } from 'react'
import moment from "moment/moment";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import CalendarHeatmap from "react-calendar-heatmap";
import { useLayoutEffect } from "react";
import { Routes, Route, useParams, BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoadingCard from "./Loading";
// import 'react-calendar-heatmap/dist/styles.css';
function App() {
  //console.log(match.params);
  const [newProfile, setNewProfile] = useState("");
  const { profile, github2 } = useParams();
  // console.log(profile);
  // console.log(github2);
  // setNewProfile(profile);

  const [count, setCount] = useState(0);
  const [dataC, setDataC] = useState([]);
  const [newS, setNew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("2022/01/01");
  const [endDate, setEndDate] = useState(new Date());
  const [leetcode, setLeetcode] = useState("");
  const [CodeForces, setCodeForces] = useState("");
  const [ApiDataCf, setApiDataCf] = useState([]);
  const [github, setGithub] = useState("");
  const [GithubApi, setGithubApi] = useState([]);
  const [loadGithub, setLoadGithub] = useState(true);
  const [leetLoading, setLeetLoading] = useState(true);
  const [username, setUsername] = useState("");
  const CalStyle = {
    margin: "auto",
    width: "92%",
  };
  async function getDataFromSearch() {
    const user = {
      profile: profile,
    };

    // setCodeForces(newProfile);
    // console.log(profile);
    // //   return;
    const data = await axios.post(`${import.meta.env.VITE_API}/user`, user);
    // console.log(data);

    // console.log(data.data.github);
    // setGithub(data.data.github);
    //  setLeetcode(data.data.leetcode);
    //  setCodeForces(data.data.codeforces);
    const profileName = data.data.name;
    setUsername(profileName);
    const UserLeetcode = data.data.leetcode;
    setLeetcode(UserLeetcode);
    const UserCodeforces = data.data.codeforces;
    setCodeForces(UserCodeforces);
    const UserGithub = data.data.github;
    setGithub(UserGithub);

    // console.log(UserLeetcode);

    // const UserGithub = data.data.github;
    // setLeetcode(data.data.leetcode);
    // console.log(leetcode);
    const value = await axios.get(
      `${import.meta.env.VITE_CODEFORCES}${UserCodeforces}`
    );
    setLoading(true);

    if (value) {
      // console.log(value.data)
      // console.log(value.data.result);
      const tempData = ApiDataCf;
      const myArray = value.data.result;
      myArray.forEach((element, index, array) => {
        var myDate = new Date(`${element.creationTimeSeconds}` * 1000)
          .toISOString()
          .replace("-", "/")
          .split("T")[0]
          .replace("-", "/");
        tempData.push({ date: `${myDate}`, count: `2` });
      });

      setApiDataCf(tempData);
      tempData.splice();
      setLoading(false);
      // toast.success("Codeforces Data Loaded Successfully");
      // console.log(ApiDataCf[1]);
      // console.log(ApiDataCf);
    }

    geGithubData(UserGithub);
    getDataFromLeetCode(UserLeetcode);
    return;
  }
  useEffect(() => {
    getDataFromSearch();
  }, [loadGithub, leetLoading]);

  const getDataFromLeetCode = async (leetcodeProfilrUrl) => {
    const value = await axios.get(
      `${import.meta.env.VITE_LEETCODE}/${leetcodeProfilrUrl}`
    );
    // console.log(value.data.status);

    if (value) {
      setCount(0);
      //  console.log(value.data.submissionCalendar);
      setDataC([]);
      // setLeetcode("");
      setLeetLoading(true);
      //newS.length=0;
      setNew([]);
      setDataC(value.data.submissionCalendar);
      // console.log("Submisson Uppddate");
      // console.log(dataC);
      const realdata = newS;

      for (let property in dataC) {
        var myDate = new Date(`${property}` * 1000)
          .toISOString()
          .replace("-", "/")
          .split("T")[0]
          .replace("-", "/");

        realdata.push({ date: `${myDate}`, count: `${dataC[property]}` });

        //console.log(`${property}: ${dataC[property]}`);
      }
      setNew(realdata);
      realdata.splice();
      // setLoading(false);
      // for (const x in dataC) {
      //   console.log(x);
      // }
      setCount(1);
      setLeetLoading(false);
    } else {
      console.log("Please Try Again");
    }
    // callAgain();
  };

  const getContributions = async (token, username) => {
    const headers = {
      Authorization: `bearer ${token}`,
    };
    const body = {
      query: `query {
          user(login: "${username}") {
            name
            contributionsCollection {
              contributionCalendar {
                colors
                totalContributions
                weeks {
                  contributionDays {
                    color
                    contributionCount
                    date
                    weekday
                  }
                  firstDay
                }
              }
            }
          }
        }`,
    };
    const response = await fetch(`${import.meta.env.VITE_GIT}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
    const data = await response.json();
    return data;
  };

  const geGithubData = async (profileUrlGit) => {
    // console.log(profileUrlGit);
    const valueGit = await getContributions(
      `${import.meta.env.VITE_TOKEN}`,
      `${profileUrlGit}`
    );
    // console.log(valueGit);
    if (valueGit) {
      setLoadGithub(true);
      // console.log(value.data.user.contributionsCollection.contributionCalendar.weeks)
      const tempArray =
        valueGit.data.user.contributionsCollection.contributionCalendar.weeks;
      const tepmValues = GithubApi;
      tempArray.forEach((element, index, array) => {
        const innerDays = element.contributionDays;
        innerDays.forEach((element, index, array) => {
          if (element.contributionCount > 0) {
            tepmValues.push({
              date: `${element.date}`,
              count: `${element.contributionCount}`,
            });
            // console.log(element.date);
            // console.log(element.contributionCount);
          }
        });
      });

      setGithubApi(tepmValues);
      // console.log(GithubApi);
      setLoadGithub(false);
    }
  };

  const handleYear = () => {
    setStartDate(new Date("2021/01/01"));
    setEndDate(new Date("2021/12/30"));
  };

  const getInitialState = () => {
    const value4 = "2022";
    return value4;
  };
  const [valueDate, setValueDate] = useState(getInitialState);

  const handleChange = (e) => {
    setValueDate(e.target.value);
    setStartDate(new Date(`${e.target.value}/01/01`));
    setEndDate(new Date(`${e.target.value}/12/30`));
  };
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

  // const[handleMonth, setHandleMonth] = useState("");
  // const[handleDay, setHandleDay] = useState("");
  // const[handleSubCount, setHandleSubCount] = useState("");
  const [isOk, setIsOk] = useState(false);

  const handleShowDate = (e, v) => {
    //  console.log(e.target.value);
    // console.log(e);
    // console.log(v);

    try {
      if (v.date) {
        const month = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        const d = new Date(v.date);
        let name = month[d.getMonth()];
        let day = d.getDate();
        // console.log(name);
        // console.log("Value of count")
        // console.log(v.count)
        // setHandleMonth(name);
        // setHandleDay(day);
        // setHandleSubCount(v.count);
        setIsOk(true);
        // toast.success(day);
        toast(`${v.count} Submissons on ${day} ${name}`, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        console.log("No Submissions");
        toast.dismiss();
        setIsOk(true);
      }
    } catch (error) {
      console.log("No Submissions");
      setIsOk(false);
      // setHandleMonth("");
      // setHandleSubCount("");
      setHandleDay("");
      toast.dismiss();
    }
  };

  const handleLeaveDate = () => {
    toast.dismiss();
    // setHandleMonth("");
    // setHandleSubCount("");
    setIsOk(false);
  };

  return (
    <>
      <div class="  min-h-screen  text-lg">
        <div class="text-six">
          <div class="details">
            <h2 class="text-xl change  leading-tight  text-white-900">
              <span class="mdi mdi-account-check blue-500"></span>{" "}
              <span class="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline  text-yellow-600  rounded">
                {" "}
                {username.toUpperCase()}
              </span>
            </h2>
          </div>

          {/* <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">User</mark> */}
          <h1 class=" text-3xl font-extrabold leading-none tracking-tight text-gray-900 change md:text-4xl text-white text-center ">
            Codeforces{" "}
            <span class="text-yellow-600 dark:text-yellow-600">Heatmap</span>{" "}
            <a
              target="blank"
              href={`https://codeforces.com/profile/${CodeForces}`}
            >
              <span class="mdi mdi-link-variant"></span>
            </a>
          </h1>
          <div className=" posYear ">
            <select
              value={valueDate}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onChange={handleChange}
            >
              <option value="2022">Select Year</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
          </div>
          {/* <CalendarHeatmap
  startDate={startDate}
  endDate={endDate}
  values={ApiDataCf}
/> */}
          {ApiDataCf.length > 0 ? (
            <CalendarHeatmap
              onMouseOver={(event, value) => {
                // console.log(event);
                // console.log(value);
                handleShowDate(event, value);
              }}
              onMouseLeave={handleLeaveDate}
              class="calS"
              startDate={startDate}
              endDate={endDate}
              values={ApiDataCf}
              classForValue={(value) => {
                if (!value) {
                  return "color-scale-0";
                } else if (value.count == 1) {
                  return `color-scale-1`;
                } else if (value.count == 2) {
                  return `color-scale-2`;
                } else if (value.count == 3) {
                  return `color-scale-3`;
                } else if (value.count >= 4) {
                  return `color-scale-4`;
                }
              }}
              gutterSize={3}
            />
          ) : (
            <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 change md:text-4xl text-white text-center ">
              {" "}
              <LoadingCard class="text-six" count={2} />
            </h1>
          )}
        </div>
        {/* { isOk===true && <div class="text-aliceblue-900 change text-center">Month - { " "} {handleMonth} { "  " } Day= { handleDay} count= { " "} {handleSubCount}</div>} */}
        {/* <div></div> */}
        {/* { isOk===true &&    <div id="toast-default" class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-yellow-600 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path></svg>
        <span class="sr-only">Fire icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">Month - { " "} {handleMonth} { "  " } Day= { handleDay} count= { " "} {handleSubCount}</div>
    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
</div>} */}

        <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 change md:text-4xl text-white text-center ">
          <span class="text-yellow-600 dark:text-yellow-600">Github </span>{" "}
          Heatmap{" "}
          <a target="blank" href={`https://github.com/${github}`}>
            <span class="mdi mdi-link-variant"></span>
          </a>
        </h1>

        {GithubApi.length > 0 ? (
          <CalendarHeatmap
            class="calS"
            startDate={startDate}
            endDate={endDate}
            values={GithubApi}
            onMouseOver={(event, value) => {
              // console.log(event);
              // console.log(value);
              handleShowDate(event, value);
            }}
            onMouseLeave={handleLeaveDate}
            classForValue={(value) => {
              if (!value) {
                return "color-scale-0";
              } else if (value.count == 1) {
                return `color-scale-1`;
              } else if (value.count == 2) {
                return `color-scale-2`;
              } else if (value.count == 3) {
                return `color-scale-3`;
              } else if (value.count >= 4) {
                return `color-scale-4`;
              }
            }}
            gutterSize={3}
          />
        ) : (
          <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 change md:text-4xl text-white text-center ">
            <LoadingCard class="text-six" count={2} />
          </h1>
        )}
        {/* <CalendarHeatmap
  startDate={startDate}
  endDate={endDate}
  values={GithubApi}
/> */}

        <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 change md:text-4xl text-white text-center ">
          Leetcode{" "}
          <span class="text-yellow-600 dark:text-yellow-600">Heatmap </span>
          <a target="blank" href={`https://leetcode.com/${leetcode}`}>
            <span class="mdi mdi-link-variant"></span>
          </a>
        </h1>
        <div class="mb-10">

        {newS.length > 3 ? (
          <CalendarHeatmap
            class="calS "
            startDate={startDate}
            endDate={endDate}
            values={newS}
            onMouseOver={(event, value) => {
              // console.log(event);
              // console.log(value);
              handleShowDate(event, value);
            }}
            onMouseLeave={handleLeaveDate}
            classForValue={(value) => {
              if (!value) {
                return "color-scale-0";
              } else if (value.count == 1) {
                return `color-scale-1`;
              } else if (value.count == 2) {
                return `color-scale-2`;
              } else if (value.count == 3) {
                return `color-scale-3`;
              } else if (value.count >= 4) {
                return `color-scale-4`;
              }
            }}
            gutterSize={3}
          />
        ) : (
          <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 change md:text-4xl text-white text-center ">
            <LoadingCard class="text-six" count={2} />
          </h1>
        )}
        </div>
      
      </div>
    </>
  );
}

export default App;
