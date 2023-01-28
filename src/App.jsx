

import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";


function App() {
  const [count, setCount] = useState(0);
  const [dataC, setDataC] = useState([]);
  const [newS, setNew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("2022/01/01");
  const [endDate, setEndDate] = useState(new Date());
  const [leetcode, setLeetcode] = useState("");
  const [CodeForces, setCodeForces] = useState("");
  const [ApiDataCf, setApiDataCf] = useState([]);
  const[github,setGithub]=useState("");
  const [GithubApi, setGithubApi] = useState([]);
  const [loadGithub, setLoadGithub] = useState(true);
  const[leetLoading,setLeetLoading]=useState(true);

  const getDataFromLeetCode = async () => {

    const value = await axios.get(
      `${import.meta.env.VITE_LEETCODE}/${leetcode}`
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
    }else{
      console.log("Please Try Again")
    }
  // callAgain();
  };
  // const callAgain=()=>{
  //   getDataFromLeetCode();
  // }
  useEffect(() => {
    
    getDataFromLeetCode();
  

  }, []);

  const getDataFromCodeForces = async () => {
    console.log(CodeForces);
  
    const value = await axios.get(
      `${import.meta.env.VITE_CODEFORCES}${CodeForces}`
    );
      setLoading(true);
    if (value) {
      console.log(value.data)
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
  };





  const getContributions = async (token, username) => {

    const headers = {
      'Authorization': `bearer ${token}`,
  }
  const body = {
      "query": `query {
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
        }`
  }
  const response = await fetch(`${import.meta.env.VITE_GIT}`, { method: 'POST', body: JSON.stringify(body), headers: headers })
  const data = await response.json()
  return data;
  }



const geGithubData = async () => {

const value = await getContributions(`${import.meta.env.VITE_TOKEN}`, `${github}`);

if(value){
  setLoadGithub(true);
 // console.log(value.data.user.contributionsCollection.contributionCalendar.weeks)
  const tempArray=value.data.user.contributionsCollection.contributionCalendar.weeks;
  const tepmValues=GithubApi;
  tempArray.forEach((element, index, array) => {
    const innerDays=element.contributionDays;
    innerDays.forEach((element, index, array) => {
  
  
     
      if(element.contributionCount>0){
        tepmValues.push({ date: `${element.date}`, count: `${element.contributionCount}` });
        console.log(element.date);
        console.log(element.contributionCount);
      }
      
  
    });
  
    });
  
    setGithubApi(tepmValues);
    console.log(GithubApi)
    setLoadGithub(false);
}




}

useEffect(() => {
  
    geGithubData();
  

}, [setLoadGithub]);
const handleYear =()=>{
  setStartDate(new Date('2021/01/01'));
  setEndDate(new Date('2021/12/30'));
}



const getInitialState = () => {
  const value = "2022";
  return value;
};

const [value, setValue] = useState(getInitialState);

const handleChange = (e) => {
  setValue(e.target.value);
  setStartDate(new Date(`${e.target.value}/01/01`));
  setEndDate(new Date(`${e.target.value}/12/30`));
 
};
  return (
    <>
      <div>
        {/* <div>
        <h1>Working</h1>
        <button onClick={getData}>Click</button>
        <pre>{JSON.stringify(newS, null, 2)}</pre>
      </div> */}

<div>
   <h4>Select Year</h4>
      <select value={value} onChange={handleChange}>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
      </select>
      <p>{`You selected ${value}`}</p>
    </div>
        <h1>Leetcode HeatMap</h1>
        <input
          type="text"
          onChange={(e) => setLeetcode(e.target.value)}
          placeholder="Username"
        />
        <button onClick={getDataFromLeetCode}>Leetcode</button>
        {/* {newS.length>5 && <CalendarHeatmap value={newS} startDate={new Date('2022/01/01') }endDate={new Date('2022/12/12')}  />} */}
        {/* <HeatMap value={newS} startDate={new Date('2022/01/01') }endDate={new Date('2023/02/02')} /> */}
        {newS.length > 1 && (
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={newS}
          />
        )}

        <hr></hr>
        <h1>CodeForces HeatMap</h1>
          
        <input
          type="text"
          onChange={(e) => setCodeForces(e.target.value)}
          placeholder="Username"
        />
        <button onClick={getDataFromCodeForces}>CodeForces</button>
  <CalendarHeatmap 
 startDate={startDate }
 endDate={endDate}  
 values={ApiDataCf} 
 
 />

 <hr></hr>
 <h1>Github HeatMap</h1>
 {/* <img src="https://ghchart.rshah.org/vivek1898" alt="Name Your Github chart"></img> */}
 <input type="text" onChange={(e)=>setGithub(e.target.value)} placeholder="Username"/>
 <button onClick={geGithubData}>Github</button>

  <CalendarHeatmap 
 startDate={startDate }
 endDate={endDate}  
 values={GithubApi} 
 
 />
  
      </div>
    </>
  );
}

export default App;
