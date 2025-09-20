import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetailsComponent from "./pages/MovieDetailsComponent";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetailsComponent />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
