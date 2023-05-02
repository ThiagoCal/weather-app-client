import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./Components.js/Search";
import Favorites from "./Components.js/Favorites";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <Navbar /> */}
                <Search />
                {/* <Footer /> */}
              </>
            }
          ></Route>
          <Route
            path="/favorites"
            element={
              <>
                {/* <Navbar /> */}
                <Favorites />
                {/* <Footer /> */}
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
