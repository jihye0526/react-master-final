import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App(){
  // 미사용. Router.tsx로 대체
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/movies/:movieId" element={<Home />}></Route>
        <Route path="/" element={<Home />}></Route> {/* 모든 경로는 /로 시작하기 때문에 맨 마지막에 넣어야함. 그렇지 않으면 /에서 모든 경로가 걸림 */}
      </Routes>
    </Router>
  );
}

export default App;