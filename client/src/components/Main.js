// if logged in render dashboard if not render sign in page
// dashboard.js and login page should render in return.

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

// import Dashboard from "../pages/Dashboard";

const Main = () => {
  return (
    <>
      loggedIn ? <Dashboard /> : <Login />
    </>
  );
};

export default Main;
