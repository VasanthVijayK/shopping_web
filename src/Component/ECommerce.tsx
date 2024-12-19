import { ThemeProvider } from "@mui/material";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./PageNotFound/PageNotFound";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import RoutingLayout from "./RoutingLayOut/RoutingLayout";
import { customTheme } from "../Theme";
import SignIn from "./ECommerce/SignIn/SignIn";
import SignUp from "./ECommerce/SignUp/Signup";
import Home from "./ECommerce/HomePage/Home";
import MyProfile from "./ECommerce/MyProfile/MyProfile";
import CartPage from "./ECommerce/CartPage/CartPage";
const ECommerce = () => {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Router>
          <Routes>
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route
              path="/"
              element={
                <Suspense fallback={
                <h1>...Loading</h1>
               }>
                <ProtectedRoute>
                  <RoutingLayout />
                </ProtectedRoute>
              </Suspense>
              }
            >
                <Route  index element={<Home />} />
                <Route path="/home" index element={<Home />} />
                <Route path="/myprofile" index element={<MyProfile />} />
                <Route path="/cart" index element={<CartPage />} />
                </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default ECommerce;
