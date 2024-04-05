import React from "react";
import SignIn from "../pages/auth/SignIn";

export const getAuthRouter = () => {
  return [
    {
      path: "/",
      element: <SignIn />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "signin",
      element: <SignIn />,
      // errorElement: <ErrorPage />,
    },
  ];
};
