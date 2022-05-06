import "./App.scss";
import Homepage from "./pages";
import Detail from "./pages/detail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Watch from "./pages/watch";
import Search from "./pages/search";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Homepage */}
          <Route exact path="/" element={<Homepage />}></Route>

          {/* Detail page */}
          <Route path=":media_type/detail/:id" element={<Detail />}></Route>
          <Route
            path=":media_type/detail/:id/season/:season_id"
            element={<Detail />}
          ></Route>

          {/* Watch page */}
          <Route path="/watch/:media_type/:id" element={<Watch />}></Route>

          {/* Search page */}
          <Route path="/search" element={<Search />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
