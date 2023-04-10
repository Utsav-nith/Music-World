import React , {useEffect} from "react";
import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {//if localstorage get token then navigate to the home page
      navigate("/");
    }
  }, []);
  return <div>{children}</div>;
}

export default PublicRoute;