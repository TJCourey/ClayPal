import StickyFooter from "./components/footer.js";
import skeet from "./components/img/skeet.png";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1> SKEET SKEET SKEET </h1>
      <img src={skeet} alt="skeet skeet skeet"></img>
      <Router>
        <Switch>
          <Route></Route>
        </Switch>
        <StickyFooter />
      </Router>
    </div>
  );
}

export default App;
