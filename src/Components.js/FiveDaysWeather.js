import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFiveDaysWeather } from "../Redux/action";

export const FiveDaysWeather = (props) => {
  const keyCity = useSelector((state) => state.key);
  const currentCity = useSelector((state) => state.city);
  const dispatch = useDispatch();
  useEffect(() => {
    if (keyCity) {
      dispatch(getFiveDaysWeather(keyCity));
    }
  }, []);

  const fiveDays = useSelector((state) => state.fivedays.fivedays);

  // let arrayWeather = fiveDays.DailyForecasts

  if (fiveDays) {
    console.log("weatherFivedays", fiveDays);
  }

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

  return (
    <div className="container mx-auto mt-3 flex gap-2">
      {fiveDays ? (
        fiveDays.DailyForecasts.map((eachDayForecast) => (
          <div class="block w-1/4 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div class="p-6 flex flex-col">
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {currentCity} - {formatDate(eachDayForecast.Date)}
              </h5>
              <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Day: {eachDayForecast.Day.IconPhrase}
                <br />
                <div className="flex justify-center">
                  <img
                    src={`https://developer.accuweather.com/sites/default/files/${checkIcon(
                      eachDayForecast.Day.Icon
                    )}-s.png`}
                  />
                </div>
              </p>
              <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Night: {eachDayForecast.Night.IconPhrase}
                <br />
                <div className="flex justify-center">
                  <img
                    src={`https://developer.accuweather.com/sites/default/files/${checkIcon(
                      eachDayForecast.Night.Icon
                    )}-s.png`}
                  />
                </div>
              </p>
              <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Temperature:
                <div className="mt-2">
                  {eachDayForecast.Temperature.Minimum.Value}°C -{" "}
                  {eachDayForecast.Temperature.Maximum.Value}
                  °C
                </div>
              </p>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default FiveDaysWeather;
