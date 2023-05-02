export const getKey = (data) => (dispatch) => {
  dispatch({
    type: "KEY",
    payload: data,
  });
};

export const getCity = (data) => (dispatch) => {
  dispatch({
    type: "CITY",
    payload: data,
  });
};

export const fetchCity = (city) => (dispatch, getState) => {
  fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=GW05i5arColtJEKIprH2Pstj2Z0ODL8W&q=${city}`
  )
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: "FETCH_CITIES",
        payload: data,
      });
    });
};

export const getWeather = (key) => (dispatch, getState) => {
  fetch(
    `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=GW05i5arColtJEKIprH2Pstj2Z0ODL8W&metric=true`
  )
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: "GET_WEATHER",
        payload: data,
      });
    });
};

export const getFiveDaysWeather = (key) => (dispatch, getState) => {
  console.log("hi from action");
  fetch(
    `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=GW05i5arColtJEKIprH2Pstj2Z0ODL8W&metric=true`
  )
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: "GET_FIVE_DAYS",
        payload: data,
      });
    });
};

export const addFavorites = (data) => (dispatch) => {
  console.log("inside action", data);
  dispatch({
    type: "ADD_FAVORITE",
    payload: data,
  });
};

export const removeFavorites = (data) => (dispatch) => {
  dispatch({
    type: "REMOVE_FAVORITE",
    payload: data,
  });
};

// export const getFavorites = (favs) => async (dispatch, getState) => {
//   console.log("fav action", favs);
//   try {
//     const response = favs.map((fav) => {
//       fav.city = {};
//       const getCityW = async () => {
//         await Promise.all(
//           fetch(
//             `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${fav.keyCity}?apikey=GW05i5arColtJEKIprH2Pstj2Z0ODL8W&metric=true`
//           ).then((res) => res.json())
//         );
//       };
//       fav.weather = getCityW();
//     });
//     dispatch({
//       type: "GET_FAVORITES",
//       payload: response,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

export const getFavorites = (favs) => async (dispatch, getState) => {
  console.log("fav action", favs);
  try {
    const response = await Promise.all(
      favs.map(async (fav) => {
        let favObj = {};
        const cityRes = await fetch(
          `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${fav.keyCity}?apikey=GW05i5arColtJEKIprH2Pstj2Z0ODL8W&metric=true`
        );
        const cityJson = await cityRes.json();
        favObj.weather = cityJson;
        favObj.city = fav.city;
        return favObj;
      })
    );
    dispatch({
      type: "GET_FAVORITES",
      payload: response,
    });
  } catch (error) {
    console.error(error);
  }
};

// 215854
