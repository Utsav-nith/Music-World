import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, user);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(HideLoading());
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-500 min-h-screen flex-col lg:flex-row flex items-center justify-center">
      <div className="flex flex-col gap-5 w-96 p-5">
        <h1 className="text-3xl font-bold text-secondary">WELCOME BACK !!</h1>
        <hr />
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="text-black bg-blue-200" onClick={login}>
          Login
        </button>
        <Link to="/register" className="text-secondary underline">
          Not yet Registered ? Click Here To Signup
        </Link>
      </div>
      <div>
        <img
          className="border-blue-600  border-2 h-[300px]"
          src="https://img.freepik.com/free-photo/volumetric-musical-background-with-treble-clef-notes-generative-ai_169016-29575.jpg?w=1380&t=st=1680983758~exp=1680984358~hmac=59d76536411e81c1af5cef57ff787b612e531723f6115d86d8e67d8d4c7106cb"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;