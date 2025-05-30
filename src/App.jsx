import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./Services/auth";
import Cookies from "js-cookies";
import { useEffect } from "react";
import { ScrollToTop, Spinner } from "./Components";
import { login, logout, startChecking } from "./Store/authSlice.js";

function App() {
  const dispatch = useDispatch();

  const checkUser = async () => {
    dispatch(startChecking());

    const user = await authService.getCurrentUser();
    if (user) {
      dispatch(login(user));
    } else {
      dispatch(logout());
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  const checkLoginStatus = () => {
    const loginTimestamp = Cookies.getItem('loginTimestamp');

    if (loginTimestamp) {
      const currentTime = Date.now();
      const timeElapsed = currentTime - loginTimestamp;
      const twentyFourHoursInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (timeElapsed > twentyFourHoursInMs) {
        // If more than 24 hours have passed, log out the user
        dispatch(logout);
        Cookies.removeItem('user');
        Cookies.removeItem('token');
        Cookies.removeItem('timestamp');
      }
    };
  };

  useEffect(() => {
    checkLoginStatus()
  }, []);

  const spinnerStatus = useSelector(state => state.spinner.status)

  return (
    <>
      {/* <ScrollToTop /> */}
      {spinnerStatus && <Spinner />}
      <Outlet />
    </>
  )
}

export default App;