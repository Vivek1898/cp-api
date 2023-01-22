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

// import 'react-calendar-heatmap/dist/styles.css';
function App() {
  //console.log(match.params);
  const [newProfile, setNewProfile] = useState("");
  const { profile, github2 } = useParams();
  console.log(profile);
  console.log(github2);
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

  async function getDataFromSearch() {
    const user = {
      profile: profile,
    };
    // setCodeForces(newProfile);
    console.log(profile);
    //   return;
    const data = await axios.post(`${import.meta.env.VITE_API}/user`, user);
    console.log(data);

    // console.log(data.data.github);
    // setGithub(data.data.github);
    //  setLeetcode(data.data.leetcode);
    //  setCodeForces(data.data.codeforces);
    const UserLeetcode = data.data.leetcode;
    const UserCodeforces = data.data.codeforces;
    const UserGithub = data.data.github;
    console.log(UserLeetcode);

    // const UserGithub = data.data.github;
    // setLeetcode(data.data.leetcode);
    // console.log(leetcode);
    const value = await axios.get(
      `${import.meta.env.VITE_CODEFORCES}${UserCodeforces}`
    );
    setLoading(true);
    if (value) {
      console.log(value.data.result);
      const tempData = ApiDataCf;
      const myArray = value.data.result;
      myArray.forEach((element, index, array) => {
        var myDate = new Date(`${element.creationTimeSeconds}` * 1000)
          .toISOString()
          .replace("-", "/")
          .split("T")[0]
          .replace("-", "/");
        tempData.push({ date: `${myDate}`, count: `5` });
      });

      setApiDataCf(tempData);
      tempData.splice();
      setLoading(false);

      console.log(ApiDataCf[1]);
      console.log(ApiDataCf);
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
    console.log(value.data.status);
    if (value) {
      setCount(0);
      //  console.log(value.data.submissionCalendar);
      setDataC([]);
      setLeetcode("");
      setLeetLoading(true);
      //newS.length=0;
      setNew([]);
      setDataC(value.data.submissionCalendar);
      // console.log("Submisson Uppddate");
      console.log(dataC);
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

  async function getContributions2(token, username) {}

  const geGithubData = async (profileUrlGit) => {
    console.log(profileUrlGit);
    const valueGit = await getContributions(
      `${import.meta.env.VITE_TOKEN}`,
      `${profileUrlGit}`
    );
    console.log(valueGit);
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
            console.log(element.date);
            console.log(element.contributionCount);
          }
        });
      });

      setGithubApi(tepmValues);
      console.log(GithubApi);
      setLoadGithub(false);
    }
  };

 
  const handleYear = () => {
    setStartDate(new Date("2021/01/01"));
    setEndDate(new Date("2021/12/30"));
  };

  
  return (
    <>
   
      <h1>CodeForces HeatMap</h1>

      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={ApiDataCf}
      />

      <hr></hr>
      <h1>Github HeatMap</h1>
 

      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={GithubApi}
      />

      <h1>Leetcode HeatMap</h1>

      <CalendarHeatmap startDate={startDate} endDate={endDate} values={newS} />
    </>
  );
}

export default App;
