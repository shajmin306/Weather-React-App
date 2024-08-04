import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine() {
  let [city, setCity] = useState("");
  let [searching, setSearching] = useState(false);
  let [weather, setWeather] = useState(null);

  function updateWeather(response) {
    setSearching(true);
    setWeather({
      temperature: response.data.temperature.current,
      wind: response.data.wind.speed,
      humidity: response.data.temperature.humidity,
      icon: response.data.condition.icon_url,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "c9b30483aedf4foe2dd664a0ftc74778";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeather);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={changeCity}
      />
      <button type="submit">Search </button>
    </form>
  );

  if (searching) {
    return (
      <div>
        {form}
        <ul>
          <li> Temperature {Math.round(weather.temperature)}°C </li>
          <li> Wind {weather.wind} km/h </li>
          <li> Humidity {weather.humidity} % </li>
          <li>
            <img src={weather.icon} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
