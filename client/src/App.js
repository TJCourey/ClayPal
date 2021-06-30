import Home from "./components/Home.js";
import MiniDrawer from "./components/NavBar.js";

import skeet from "./components/img/skeet.png";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1> SKEET SKEET SKEET </h1>
      <img src={skeet} alt="skeet skeet skeet"></img>
      <Router>
        <MiniDrawer />
        <Switch>
          <Route></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
