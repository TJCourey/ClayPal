import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Auth from "../utils/auth";

const Main = () => {
  return Auth.loggedIn() ? <Dashboard /> : <Login />;
};

export default Main;
