import React, { useRef } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  async function SignupBe() {
    const userVal = userRef.current?.value;
    const passVal = passwordRef.current?.value;
    try {
      const response = await axios.post(`${BACKEND_URL}/api/signup`, {
        username: userVal,
        password: passVal,
      });
      alert("signedup");
      navigate("/signin");
    } catch (e) {
      alert("something went wrong");
    }
  }

  return (
    <div className=" h-screen w-full flex justify-center items-center bg-slate-700">
      <div className="h-70 w-lg p-4 border border-slate-50 shadow-2xl bg-white rounded-3xl">
        <div className="flex justify-center items-center font-bold text-2xl">
          <h1>Signup</h1>
        </div>
        <div className="p-7 flex justify-center items-center flex-col">
          <div className="p-2">
            <Input placeHolder="username" reference={userRef} />
          </div>
          <div className="p-2">
            <Input placeHolder="password" reference={passwordRef} />
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <Button variant="primary" text="submit" onclick={() => SignupBe()} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
