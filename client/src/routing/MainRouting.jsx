import { Navigate } from "react-router-dom";
import Main from "../pages/Main";
import ShowData from "../pages/ShowData";

 const MainRouting = [
  {
    path: "/main",
    element:<Main/>
  },
  {
    path: "/show",
    element:<ShowData />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
];
export default MainRouting;