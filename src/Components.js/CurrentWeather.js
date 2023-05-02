import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getWeather, addFavorites, removeFavorites } from "../Redux/action";

export const CurrentWeather = (props) => {
  const dispatch = useDispatch();

  const keyCity = useSelector((state) => state.key);
  console.log(keyCity);
  const [isFavorite, setIsFavorite] = useState(true);

  useEffect(() => {
    if (keyCity) {
      dispatch(getWeather(keyCity));
    }
  }, [isFavorite, keyCity]);

  const currentWeather = useSelector((state) => state.weather.weather);
  const currentCity = useSelector((state) => state.city);
  const favorites = useSelector((state) => state.favorites);
  console.log("current city---->", currentCity);
  console.log("weather", currentWeather);
  console.log("favorites", favorites);

  const checkIcon = (icon) => {
    let iconFinal;
    if (icon < 10) {
      return (iconFinal = `0${icon}`);
    }
    return icon;
  };

  useEffect(() => {
    if (favorites && favorites.some((e) => e.keyCity === keyCity)) {
      console.log("is in favorite", favorites);
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites, keyCity]);

  const handleFavorite = () => {
    if (isFavorite) {
      console.log("is in favorite", favorites);
      dispatch(removeFavorites(keyCity));
      setIsFavorite(false);
    } else {
      setIsFavorite(true);
      dispatch(addFavorites({ keyCity: keyCity, city: currentCity }));
    }
  };

  if (currentWeather)
    return (
      <div className="container mx-auto mt-3 flex">
        <div class="block w-1/4 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div class="p-6 flex flex-col">
            <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {currentCity} - {currentWeather.DailyForecasts[0].Date}
            </h5>
            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Day: {currentWeather.DailyForecasts[0].Day.IconPhrase}
              <br />
              <div className="flex justify-center">
                <img
                  src={`https://developer.accuweather.com/sites/default/files/${checkIcon(
                    currentWeather.DailyForecasts[0].Day.Icon
                  )}-s.png`}
                />
              </div>
            </p>
            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Night: {currentWeather.DailyForecasts[0].Night.IconPhrase}
              <br />
              <div className="flex justify-center">
                <img
                  src={`https://developer.accuweather.com/sites/default/files/${checkIcon(
                    currentWeather.DailyForecasts[0].Night.Icon
                  )}-s.png`}
                />
              </div>
            </p>
            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Temperature:
              <div className="mt-2">
                {currentWeather.DailyForecasts[0].Temperature.Minimum.Value}°C -{" "}
                {currentWeather.DailyForecasts[0].Temperature.Maximum.Value}°C
              </div>
            </p>
            <button type="button" onClick={handleFavorite}>
              {!isFavorite ? "Add to favorites" : "Remove from favorites"}
            </button>
          </div>
        </div>
      </div>
    );
};

export default CurrentWeather;
