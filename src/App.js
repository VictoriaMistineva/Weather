import React, {useState, useEffect} from 'react';
import LocationBox from "./components/location/location";
import TemperatureAndWeather from "./components/temp/temp";
import {backgroundStyleByTemp} from "./components/background/background";
import Clothes from "./components/clothes/clothes";
import { loadGoogleScript } from './lib/GoogleLogin';
const googleClientId = "919987767854-v7s232d6ucjlisc0und3m8ik8n13jkgb.apps.googleusercontent.com";



const api = {
  key: "25521e44d3e70320abb96685b57352e9",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // eslint-disable-next-line
  const [name, setName] = useState('');
  // eslint-disable-next-line
  const [email, setEmail] = useState('');
  // eslint-disable-next-line
  const [imageUrl, setImageUrl] = useState();

  const onSuccess = (googleUser) => {
    setIsLoggedIn(true);
    const profile = googleUser.getBasicProfile();
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
  };
  
  const onFailure = () => {
    setIsLoggedIn(false);
  }
  
  const logOut = () => {
    (async() => {
      await googleAuth.signOut();
      setIsLoggedIn(false);
      renderSigninButton(gapi);
    })();
  };
  
  const renderSigninButton = (_gapi) => {
    _gapi.signin2.render('google-signin', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure 
    });
  }
  
  
  useEffect(() => {
    
    //window.gapi is available at this point
    window.onGoogleScriptLoad = () => {
     
      const _gapi = window.gapi;
      setGapi(_gapi);
      
      _gapi.load('auth2', () => {
        (async () => { 
          const _googleAuth = await _gapi.auth2.init({
           client_id: googleClientId
          });
          setGoogleAuth(_googleAuth);
          renderSigninButton(_gapi);
        })();
      });
    }
    
    //ensure everything is set before loading the script
    loadGoogleScript();
    // eslint-disable-next-line
  }, []);


  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  return (
    <div>
        {!isLoggedIn &&
          <div className="login-screen-cover">

            <div className="login-screen-text-box">
              <h1 className="login-screen-heading-primary">
                <span className="login-screen-heading-primary-main">Clothing recommendation</span>
                <span className="login-screen-heading-primary-sub">depending on the weather</span>
              </h1>
              <div id="google-signin" className="google-sign-button"></div>
            </div>
          </div>
        }
        {isLoggedIn &&
          <div
          className={(backgroundStyleByTemp(weather.main))}>
            <main>
              <div>
                <div className="search-box">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Сity search.."
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                    onKeyPress={search}
                  />
                  <button id="login" className="button blue" onClick={logOut}>
                    <i className="fa fa-unlock"></i>
                    <span>Log Out</span>
                  </button>
                </div>
              </div>

        {(typeof weather.main != "undefined") ? (
          <div className="case">
        {/*локация кейс*/}
          <LocationBox  weather = {weather}/>
        {/*температура*/}
          <TemperatureAndWeather weather = {weather}/>
        {/*одежда*/}
          <Clothes weather = {weather}/>
          </div>
          ) : ('')}
          </main>
          </div>
        }
    </div>
  );
}

export default App;
