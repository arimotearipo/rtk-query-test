import "./App.css";
import Directors from "./components/directors/Directors";
import Movies from "./components/movies/Movies";
import Home from "./components/home/Home";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/directors" element={<Directors />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
