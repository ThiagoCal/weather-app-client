import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCity, getKey, getCity } from "../Redux/action";
import CurrentWeather from "./CurrentWeather";
import FiveDaysWeather from "./FiveDaysWeather";
import Favorites from "./Favorites";

export const Search = (props) => {
  const [typed, setTyped] = useState("");

  const arrLocation = useSelector((state) => {
    return state.cities[0];
  });

  // const arrWeather = useSelector(state => state.five_d_weather);

  // const currentWeather = useSelector((state) => state.weather);
  // console.log(currentWeather);

  const location = useLocation();
  const stateKey = location.state?.keyC?.key;
  const stateCity = location.state?.keyC?.city;
  // console.log("stateKey----->>>", stateKey);
  // if (stateCity) {
  //   console.log("state City ---->", stateCity, stateKey);
  // }

  const dispatch = useDispatch();
  useEffect(() => {
    if (typed) {
      dispatch(fetchCity(typed));
    } else if (stateKey) {
      dispatch(getKey(stateKey));
      dispatch(getCity(stateCity));
    }
  }, [typed, stateKey]);

  let keyCity = "";
  let cityName = "";

  const handleClick = (e) => {
    e.preventDefault();
    if (arrLocation != null && arrLocation.length > 0) {
      keyCity = arrLocation[0].Key;
      cityName = arrLocation[0].LocalizedName;
      console.log("keycity", keyCity);
    }
    if (keyCity) {
      console.log("keycity:", keyCity);
      dispatch(getKey(keyCity));
      dispatch(getCity(cityName));
    }
  };

  keyCity = useSelector((state) => state.key);

  return (
    <>
      <div>Home</div>
      <label for="cities">Choose a city:</label>
      <input
        type="text"
        list="cities"
        value={typed}
        onChange={(e) => {
          setTyped(e.target.value);
          console.log("option", e.target.option);
        }}
      ></input>
      <button type="button" onClick={(e) => handleClick(e)}>
        Search
      </button>
      <br />
      {/* <Link to={`/favorites`}>Favorites</Link> */}

      <datalist id="cities">
        {arrLocation ? (
          arrLocation.map((loc) => {
            console.log("loc", loc);
            return (
              <option id={loc.Key} value={loc.LocalizedName}>
                {loc.LocalizedName}
              </option>
            );
          })
        ) : (
          <>Nothing</>
        )}
      </datalist>
      {keyCity ? (
        <>
          <CurrentWeather />
          <FiveDaysWeather />
          {/* <Favorites /> */}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
