import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./Components.js/Search";
import Favorites from "./Components.js/Favorites";
import Navbar from "./Components.js/Navbar";
import Footer from "./Components.js/Footer";

function App() {
  return (
    <div className="App bg-slate-50">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Search />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/favorites"
            element={
              <>
                <Navbar />
                <Favorites />
                <Footer />
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
