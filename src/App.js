import "./App.scss";
import Homepage from "./pages";
import Detail from "./pages/detail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Watch from "./pages/watch";
import Search from "./pages/search";
import TypePage from "./pages/type";
import TrendingPage from "./pages/top";
// import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
function App() {
  // const pathName = window.location.pathName;

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   console.log(pathName);
  // }, [pathName]);
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <Routes>
          {/* Homepage */}
          <Route exact path="/" element={<Homepage />}></Route>

          {/* Detail page */}
          <Route path=":mediaType/detail/:id" element={<Detail />}></Route>
          <Route
            path=":mediaType/detail/:id/season/:season_id"
            element={<Detail />}
          ></Route>

          {/* Watch page */}
          <Route path="/watch/:mediaType/:id" element={<Watch />}></Route>

          {/* Search page */}
          <Route path="/search" element={<Search />}></Route>

          {/* Type page */}
          <Route path="/type/:mediaType" element={<TypePage />}></Route>

          {/* Hot page */}
          <Route path="/top" element={<TrendingPage />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
