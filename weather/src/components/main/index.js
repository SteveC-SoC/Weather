import "./app.css";
import { useState } from "react";

/*these should not be pushed to github, put in .env file,
after you have placed info in the .env file, you need to restart your build to have this take effect*/
const api = {
   key: process.env.REACT_APP_API_KEY,
  base: process.env.REACT_APP_API_BASE,
};

// const API_KEY = process.env.REACT_APP_API_KEY;
// const API_BASE = process.env.REACT_APP_API_BASE;


function App() {

  //two useState for the search "query" and the weather is ths json file that is returned from the api request
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  /*api fetch request
  evt stands for event
  could this be changed into a async?*/
  const search = (evt) => {
    //the if statement is true if the "Enter" key is pressed on the keyboard
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          // sets the query back to empty, to allow other location to be typed
          setQuery("");
          /*console.log no longer needed this was only to check info received from fetch */
          console.log(result);
        });
    }
  };

  /*this is a constructor for the date 
  d == the new Date () requested below
  */
  const dateBuilder = (d) => {
    let months = [
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
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    //this returns a number between 0-6, which pulls the value of the date array
    let day = days[d.getDay()];
    //this gives us the date, 1-31 for the date of the month
    let date = d.getDate();
    //this returns a number between 0-11, which pulls the month out of the month array
    let month = months[d.getMonth()];
    /*this returns the full year, for example 2021, just writing year returns "121" */
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
    /*this is a bit complex/weird, it is a ternary inside a ternary, so im' going to break it down
    outermost edge is saying if weather.main is not not "undefined" (so weather.main IS "undefined") return "app" as the className
    
    if weather.main is NOT "undefined", if the temp is GREATER than 16 return classname "app.warm" which shows the red background,
     if temp is LESS than 16, return "app", which is the blue background
    
    the blue background is the default when the app opens */
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
    {/* not used <main> before, but it does what is says on the tin, this identifies that main content of the document/page */}
      <main>
        <div className="searchBox">
          <input
            type="text"
            className="searchBar"
            placeholder="Search....."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="locationBox">
              <div className="location">
              {/* this takes the name fromt eh weather json file
              and the "sys" is part of the json object that the counrty is contained within  */}
                {weather.name}, {weather.sys.country}
              </div>
              {/* Date objects are created with the new Date() constructor. Based on the dateBuilder above, we are returning the current day, date, month and year */}
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weatherBox">
              <div className="temp">
                {/* to get the degree symbol it is  Alt + 0176*/}
                {Math.round(weather.main.temp)}°C
              </div>
              {/* some json files have multiple weather keys in their object (if the country is large) and we are requesting the first result in the weather key, if there is only one it will still return */}
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
