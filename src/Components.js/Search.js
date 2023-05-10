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
      <div class="flex items-center justify-center py-8">
        {/* <div class="font-bold text-2xl mb-4">Home</div> */}
        <div class="flex flex-col items-center">
          <label for="cities" class="font-medium text-lg mb-2">
            Choose a city:
          </label>
          <input
            type="text"
            list="cities"
            value={typed}
            onChange={(e) => {
              setTyped(e.target.value);
              console.log("option", e.target.option);
            }}
            class="py-2 px-4 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></input>
          <datalist id="cities" class="mt-2">
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
        </div>
        <button
          type="button"
          onClick={(e) => handleClick(e)}
          class="self-end ml-2 py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
      </div>

      {keyCity ? (
        <div className="container mx-auto" style={{ maxWidth: "960px" }}>
          <h1 className="self-center font-medium leading-tight text-neutral-800 text-xl mb-3">
            Current Weather
          </h1>
          <div className="flex justify-center align-center">
            <CurrentWeather />
          </div>
          <>
            <h2 className="text-xl font-medium leading-tight text-neutral-800 mt-5 p-2">
              Five Days Forecast
            </h2>
            <FiveDaysWeather />
          </>
          {/* <Favorites /> */}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Search;
