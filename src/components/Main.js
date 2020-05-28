import React, { useState } from "react";
import axios from "axios";

// Context
import Context from "../Context";

// Components
import Header from "./Header";
import Content from "./Contnet";
import WeatherSearch from "./WeatherSearch";
import WeatherData from "./WeatherData";
import Error from "./Error";
import DateTime from "./DateTime";
import Tagline from "./Tagline";
import Footer from "./Footer";

const Main = () => {
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();
  const [error, setError] = useState();
  const api_call = async (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    if (!location)
      return setError("Please enter name of the city."), setWeather(null);

    const API_KEY = "9ca0914618ad8a3e368bc57110dc986b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
    const res = await axios.get(url);
    setWeather(res.data.main);
    setCity(res.data.name);
    setError(null);
  };

  return (
    <div className='main'>
      <Header />
      <Content>
        <Tagline />
        <DateTime />
        <Context.Provider value={{ api_call, weather, city }}>
          <WeatherSearch />
          {weather && <WeatherData />}
          {error && <Error error={error} />}
        </Context.Provider>
        <Footer />
      </Content>
    </div>
  );
};

export default Main;
