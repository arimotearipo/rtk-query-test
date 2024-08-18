import { useState } from "react";
import "./App.css";
import Directors from "./components/directors/Directors";
import Movies from "./components/movies/Movies";
import { Provider } from "react-redux";
import { store } from "./store";
import HealthCheck from "./components/healthcheck/HealthCheck";

type CurrentPage = "movies" | "directors" | "healthcheck";

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("movies");

  function handleViewMovies() {
    setCurrentPage("movies");
  }

  function handleViewDirectors() {
    setCurrentPage("directors");
  }

  function handleViewHealthCheck() {
    setCurrentPage("healthcheck");
  }

  return (
    <>
      <Provider store={store}>
        <button type="button" onClick={handleViewMovies}>
          Movies
        </button>
        <button type="button" onClick={handleViewDirectors}>
          Directors
        </button>
        <button type="button" onClick={handleViewHealthCheck}>
          HealthCheck
        </button>
        <div className="card">
          {currentPage === "directors" && <Directors />}
          {currentPage === "movies" && <Movies />}
          {currentPage === "healthcheck" && <HealthCheck />}
        </div>
      </Provider>
    </>
  );
}

export default App;
