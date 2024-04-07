import React, { useState } from "react";
import { login } from "../ds/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth";
const useAuth = () => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const loginUser = async ({ email, password }) => {
    setLoading(true);
    const body = {
      email,
      password,
    };
    const res = await login(body);
    console.log({ user: res.data.user });
    dispatch(setUser(res.data.user));
    setLoading(false);
    return res;
  };
  return {
    loading,
    loginUser,
  };
};

export default useAuth;
