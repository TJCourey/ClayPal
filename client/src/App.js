import Main from "./components/Main.js";
import MiniDrawer from "./components/NavBar.js";
import StickyHeadTable from "./pages/LeaderBoard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SkeetScore from "./pages/SkeetScore";
import TrapScore from "./pages/TrapScore";
import Dashboard from "./pages/Dashboard";
// import skeet from "./components/img/skeet.png";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <h1> SKEET SKEET SKEET </h1>
      <img src={skeet} alt="skeet skeet skeet"></img> */}
        <Router>
          <MiniDrawer />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/leaderboard">
              <StickyHeadTable />
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
    </ApolloProvider>
  );
}

export default App;
