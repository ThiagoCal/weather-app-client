const initState = {
  key: "",
  city: "",
  typed: "",
  cities: [],
  weather: {},
  fivedays: {},
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  fav_weather: [],
};
// JSON.parse(localStorage.getItem('favorites'))

const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case "KEY":
      return { ...state, key: action.payload };
    case "CITY":
      return { ...state, city: action.payload };
    case "FETCH_CITIES":
      return { ...state, cities: [action.payload] };
    case "GET_WEATHER":
      return { ...state, weather: { weather: action.payload } };
    case "GET_FIVE_DAYS":
      console.log(action.payload);
      return { ...state, fivedays: { fivedays: action.payload } };
    case "ADD_FAVORITE":
      if (state.favorites.some((e) => e.keyCity === action.payload.keyCity)) {
        /* vendors contains the element we're looking for */
        console.log("repeated data");
        return { ...state, favorites: [...state.favorites] };
      }
      localStorage.setItem(
        "favorites",
        JSON.stringify([...state.favorites, action.payload])
      );
      return { ...state, favorites: [...state.favorites, action.payload] };
    case "REMOVE_FAVORITE":
      console.log("action payload", action.payload);
      const indexOfFavorite = state.favorites.findIndex((object) => {
        return object.keyCity === action.payload;
      });
      if (indexOfFavorite > -1) {
        state.favorites.splice(indexOfFavorite, 1);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
      return { ...state, favorites: [...state.favorites] };

    case "GET_FAVORITES":
      console.log("get favorites", action.payload);
      // if (
      //   state.fav_weather[0].some(
      //     (e) =>
      //       e.DailyForecasts[0].link === action.payload.DailyForecasts[0].link
      //   )
      // ) {
      //   /* vendors contains the element we're looking for */
      //   console.log("repeated data");
      //   return { ...state, fav_weather: [...state.fav_weather] };
      // }
      return {
        ...state,
        fav_weather: [...state.fav_weather, action.payload],
      };
    case "LOADING":
      return { ...state, loading: true };
    default:
      return { ...state };
  }
};

export default reducer;
