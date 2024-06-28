import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import searchicon from "../assets/search.png";
import clearicon from "../assets/clear.png";
import cloudicon from "../assets/cloud.png";
import drizzleicon from "../assets/drizzle.png";
import rainicon from "../assets/rain.png";
import snowicon from "../assets/snow.png";
import windicon from "../assets/wind.png";
import humiditycon from "../assets/humidity.png";

const Weather = ({defaultcity}) => {
  
  const inputRef = useRef()

  const [weatherData,SetWeatherData] = useState(false);

  const allIcons = {
    "01d": clearicon,
    "01n": clearicon,
    "02d": cloudicon,
    "02n": cloudicon,
    "03d": cloudicon,
    "03n": cloudicon,
    "04d": drizzleicon,
    "04n": drizzleicon,
    "09d": rainicon,
    "09n": rainicon,
    "10d": rainicon,
    "10n": rainicon,
    "13d": snowicon,
    "13n": snowicon,
  }

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clearicon;
      SetWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      })
    } catch (error) {
      SetWeatherData(false);
      console.error("Error in Fetching Data")
    }
  }

  useEffect(()=>{
    search(defaultcity)
  },[])


  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef}  type="text" placeholder="Search" />
        <img src={searchicon} onClick={()=>search(inputRef.current.value)}/>
      </div>
      {weatherData?<>
        <img src={weatherData.icon} className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°c</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humiditycon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={windicon} alt="" />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div></>:<></>}
      
    </div>
  );
};

export default Weather;
