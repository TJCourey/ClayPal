import Home from "./components/Home.js";
import MiniDrawer from "./components/NavBar.js";
import StickyHeadTable from "./pages/LeaderBoard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SkeetScore from "./pages/SkeetScore";
import TrapScore from "./pages/TrapScore";

import skeet from "./components/img/skeet.png";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <h1> SKEET SKEET SKEET </h1>
      <img src={skeet} alt="skeet skeet skeet"></img> */}
      <Router>
        <MiniDrawer />
        <Switch>
          <Route exact path="/">
            <Home />{" "}
          </Route>
          <Route exact path="/leaderboard">
            <StickyHeadTable />{" "}
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/skeetscore">
            <SkeetScore />
          </Route>
          <Route exact path="/trapscore">
            <TrapScore />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
