import React from 'react';
import './temp.css';

function TemperatureAndWeather(props) {
  const {weather} = props;

  return(
    <div className="weather-box">
      <div className="temp">
        {Math.round(weather.main.temp)}°c
      </div>
      {/*текст погоды*/}
      <div className="weather">{weather.weather[0].description}</div>
    </div>
  );

}
export default TemperatureAndWeather;