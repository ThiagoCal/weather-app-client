import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFavorites } from "../Redux/action";

export const Favorites = (props) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  useEffect(() => {
    if (favorites) {
      console.log("hi from favorites");
      dispatch(getFavorites(favorites));
    }
  }, [favorites]);

  const checkIcon = (icon) => {
    let iconFinal;
    if (icon < 10) {
      return (iconFinal = `0${icon}`);
    }
    return icon;
  };

  const favoriteWeather = useSelector((state) => state.fav_weather[0]);
  console.log("favorites weather", favoriteWeather);

  if (favoriteWeather) {
    {
      favoriteWeather.map((favorite) => {
        console.log("favorite", favorite);
      });
    }
    return (
      <div className="flex">
        {favoriteWeather.map((favorite) => {
          return (
            <div className="container mx-auto mt-3 flex">
              <div class="block w-1/4 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div class="p-6 flex flex-col">
                  <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                    {favorite.city} - {favorite.weather.DailyForecasts[0].Date}
                  </h5>
                  <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    Day: {favorite.weather.DailyForecasts[0].Day.IconPhrase}
                    <br />
                    <div className="flex justify-center">
                      <img
                        src={`https://developer.accuweather.com/sites/default/files/${checkIcon(
                          favorite.weather.DailyForecasts[0].Day.Icon
                        )}-s.png`}
                      />
                    </div>
                  </p>
                  <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    Night: {favorite.weather.DailyForecasts[0].Night.IconPhrase}
                    <br />
                    <div className="flex justify-center">
                      <img
                        src={`https://developer.accuweather.com/sites/default/files/${checkIcon(
                          favorite.weather.DailyForecasts[0].Night.Icon
                        )}-s.png`}
                      />
                    </div>
                  </p>
                  <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    Temperature:
                    <div className="mt-2">
                      {
                        favorite.weather.DailyForecasts[0].Temperature.Minimum
                          .Value
                      }
                      °C -{" "}
                      {
                        favorite.weather.DailyForecasts[0].Temperature.Maximum
                          .Value
                      }
                      °C
                    </div>
                  </p>
                  {/* <Link to=></Link> */}
                  {/* <button type="button" onClick={handleFavorite}>
                {!isFavorite ? "Add to favorites" : "Remove from favorites"}
              </button> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default Favorites;
