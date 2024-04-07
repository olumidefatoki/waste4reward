import React, { useState } from "react";
import { login } from "../ds/user";
import fetcher from "../api/fetacher";

const useProgram = () => {
  const [loading, setLoading] = useState();
  const [user, setUser] = useState();
  const loginUser = async ({ email, password }) => {
    setLoading(true);
    const res = await fetcher("/program", {
      method: "get",
    });
    setUser(res.data.user);
    // console.log({ user: res.data.user });
    // localStorage.setItem("accessToken", res.data.access_token);
    // localStorage.setItem({ accessToken: res.data.access_token });

    setLoading(false);

    return res;
  };
  return {
    loading,
    loginUser,
    user,
  };
};

export default useProgram;
