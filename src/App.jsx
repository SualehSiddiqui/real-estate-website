import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./Services/auth";
import Cookies from "js-cookies";
import { useEffect } from "react";
import { Spinner } from "./Components";
import { login, logout } from "./Store/authSlice.js";

function App() {
  const dispatch = useDispatch();

  const checkUser = async () => {
    const user = await authService.getCurrentUser();
    if (user) {
      dispatch(login(user));
    } else {
      dispatch(logout());
    }
  };
  useEffect(() => {
    checkUser();
  }, [dispatch]);

  const checkLoginStatus = () => {
    const loginTimestamp = Cookies.getItem('loginTimestamp');

    if (loginTimestamp) {
      const currentTime = Date.now();
      const timeElapsed = currentTime - loginTimestamp;
      const twentyFourHoursInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (timeElapsed > twentyFourHoursInMs) {
        // If more than 24 hours have passed, log out the user
        dispatch(logout);
        Cookie.removeItem('user');
        Cookie.removeItem('token');
        Cookie.removeItem('timestamp');
      }
    };
  };

  useEffect(() => {
    checkLoginStatus()
  }, []);

  const spinnerStatus = useSelector(state => state.spinner.status)

  return (
    <>
      {spinnerStatus && <Spinner />}
      <Outlet />
    </>
  )
}

export default App;