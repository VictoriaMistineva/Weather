import React from "react";
import './clothes.css'
import listClothers from './data/listClothers.json';

function ClothesRecomendate(props) {
  const {weather} = props;


  const tempClothers = (t) => {
    if (typeof t != "undefined") {
      //проверяем существует ли температура
      if (t.temp && t.temp >= 25) {
        return `${listClothers.map(item => item.hot)}`;
      }
      if (t.temp && t.temp >= 20) {
        return `${listClothers.map(item => item.warm)}`;
      }
      if (t.temp && t.temp >= 15) {
        return `${listClothers.map(item => item.warm15)}`;
      }
      if (t.temp && t.temp >= 0) {
        return `${listClothers.map(item => item.zero)}`;
      }
      if (t.temp && t.temp <= -1) {
        return `${listClothers.map(item => item.warm1)}`;
      }
      if (t.temp && t.temp <= -20) {
        return `${listClothers.map(item => item.cold)}`;
      }
    }
  }
  return (
    <div className="clothers-box">
      <div className="text">
        <p>{tempClothers(weather.main)}</p>
      </div>
    </div>
  );
}

export default ClothesRecomendate;