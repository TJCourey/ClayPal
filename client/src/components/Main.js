import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Auth from "../utils/auth";

const Main = () => {
  if (Auth.loggedIn()) {
    return <Dashboard />;
  }
  return <Login />;
};

export default Main;
