import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFavorites, removeFavorites } from "../Redux/action";

export const Favorites = (props) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const favoriteWeather = useSelector((state) => state.fav_weather);

  useEffect(() => {
    const localFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log("LOCAL FAVS ", localFavs);
    dispatch(getFavorites(localFavs));
  }, [favorites]);

  const checkIcon = (icon) => {
    let iconFinal;
    if (icon < 10) {
      return (iconFinal = `0${icon}`);
    }
    return icon;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  const handleFavorite = (keyCity) => {
    console.log("handle favorite -->", keyCity);
    dispatch(removeFavorites(keyCity));
  };

  console.log("favorites weather", favoriteWeather);

  if (favoriteWeather && favoriteWeather.length > 0) {
    {
      favoriteWeather.map((favorite) => {
        console.log("favorite", favorite);
      });
    }
    return (
      <div
        className=" container mx-auto mt-3 gap-x-2 flex"
        style={{ maxWidth: "960px" }}
      >
        {favoriteWeather.map((favorite) => {
          return (
            <div class="block rounded-lg w-2/4 bg-white shadow-lg dark:bg-neutral-700">
              <div class="p-6 flex flex-col">
                <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  {favorite.city} -{" "}
                  {formatDate(favorite.weather.DailyForecasts[0].Date)}
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
                <Link
                  to="/"
                  state={{
                    keyC: { key: favorite.keyCity, city: favorite.city },
                  }}
                  className="inline-block px-4 py-2 font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Open
                </Link>
                <button
                  type="button"
                  onClick={() => handleFavorite(favorite.keyCity)}
                >
                  Remove from favorites
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="mt-5">
        <span>No favorites found</span>
      </div>
    );
  }
};

export default Favorites;
