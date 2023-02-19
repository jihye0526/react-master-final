import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App(){
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path={["/", "/movies/:movieId"]}> {/* 모든 경로는 /로 시작하기 때문에 맨 마지막에 넣어야함. 그렇지 않으면 /에서 모든 경로가 걸림 */}
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;