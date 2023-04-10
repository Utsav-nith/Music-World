import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const register = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/register`, user);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(HideLoading());
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-500 min-h-screen flex-col flex lg:flex-row  items-center justify-center">
      <div>
        <img
          className=" border-blue-600  border-2 h-[300px]"
          src="https://img.freepik.com/free-photo/volumetric-musical-background-with-treble-clef-notes-generative-ai_169016-29575.jpg?w=1380&t=st=1680983758~exp=1680984358~hmac=59d76536411e81c1af5cef57ff787b612e531723f6115d86d8e67d8d4c7106cb"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-5 w-96 p-5  ">
        <h1 className="text-3xl font-bold text-secondary">WELCOME</h1>
        <hr />
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
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
        <button className="text-black bg-blue-200" onClick={register}>
          Register
        </button>
        <Link to="/login" className="text-secondary underline">
          Already Registered ? Click Here To Login
        </Link>
      </div>
    </div>
  );
}

export default Register;