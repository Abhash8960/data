
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AuthenticationRoutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default AuthenticationRoutes;
