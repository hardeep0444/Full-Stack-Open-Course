import axios from "axios";
import { useState } from "react";
import kelvinToCelcius from "../utils/kelvinToCelcius";

const CountryDetails = ({ country }) => {
  const [temperature, setTemperature] = useState(0);
  const [wind, setWind] = useState(0);
  const [icon, setIcon] = useState("");
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}`
    )
    .then((response) => {
      setTemperature(
        Math.round(kelvinToCelcius(response.data.main.temp) * 10) / 10
      );
      setWind(response.data.wind.speed);
      setIcon(response.data.weather[0].icon);
    })
    .catch((error) => {
      console.log("Error from the open weather map API");
    });

  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital}
        <br></br>
        area {country.area}
      </p>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>
        <img src={country.flags.png} alt={`${country.name}`}></img>
      </div>
      <h2>Weather in {country.capital}</h2>
      <div>temperature {temperature} Celcius</div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      <div>wind {wind} m/s</div>
    </div>
  );
};
export default CountryDetails;
