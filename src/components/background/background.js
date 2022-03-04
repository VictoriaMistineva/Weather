import './background.css'

export function backgroundStyleByTemp(t) {
  if (typeof t != "undefined") {
    //проверяем существует ли температура
    if (t.temp && t.temp >= 30){
      return "app hot"
    }
    if (t.temp && t.temp >= 20){
      return "app warm20"
    }
    if (t.temp && t.temp >= 15){
      return "app warm15"
    }
    if (t.temp && t.temp >= 0){
      return "app warm"
    }
    if (t.temp && t.temp <= -1){
      return "app cold"
    }
    if (t.temp && t.temp <= -20){
      return "app cold20"
    }
  }
  else {
    return "app"
  }
}
