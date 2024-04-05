import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard";
import Aggregator from "../pages/aggregator";
import Collector from "../pages/collector";
import Recycler from "../pages/recycler";
import Transaction from "../pages/transaction";
import User from "../pages/user";
import Waybill from "../pages/waybill";

// const SignUp = lazy(() => import('../pages/Auth/SignUp'));
// const SignIn = lazy(() => import('../pages/Auth/SignIn'));
// const CreatePassword = lazy(() => import('../pages/Auth/CreatePass'));
// const ForgotPassword = lazy(() => import('../pages/Auth/forgotpass'));
// const GetStarted = lazy(() => import('../pages/Auth/GetStarted'));
// const SuccessSignUp = lazy(() => import('../pages/Auth/SuccessSignUp'));
// const SuccessSignIn = lazy(() => import('../pages/Auth/SuccessSignIn'));
// const SuccessVerification = lazy(() =>
//   import('../pages/Auth/SuccessVerification'),
// );
// const Register = lazy(() => import('../pages/Auth/Register'));
// const EditUserProfile = lazy(() => import('../pages/Auth/EditUserProfile'));
// const SuccessRegister = lazy(() => import('../pages/Auth/SuccessRegister'));
// const Migrations = lazy(() => import('../pages/Auth/Migrations'));
// const ChangeUserPassword = lazy(() =>
//   import('../pages/Auth/ChangeUserPassword'),
// );
// const ErrorPage = lazy(() => import('../pages/ErrorPage'));

export const getAuthRouter = () => {
  return [
    {
      path: "/",
      element: <DashboardLayout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          children: [
            {
              path: "/dashboard",
              element: <Dashboard />,
              // errorElement: <ErrorPage />,
            },
            {
              path: "/aggregator",
              element: <Aggregator />,
              // errorElement: <ErrorPage />,
            },
            {
              path: "/collector",
              element: <Collector />,
              // errorElement: <ErrorPage />,
            },
            {
              path: "/recycler",
              element: <Recycler />,
              // errorElement: <ErrorPage />,
            },
            {
              path: "/transaction",
              element: <Transaction />,
              // errorElement: <ErrorPage />,
            },
            {
              path: "/user",
              element: <User />,
              // errorElement: <ErrorPage />,
            },
            {
              path: "/waybill",
              element: <Waybill />,
              // errorElement: <ErrorPage />,
            },
            // {
            //   path: "/dashboard/:modelId",
            //   element: <DashboardLayout />,
            //   errorElement: <ErrorPage />,
            // },
          ],
        },
      ],
    },
  ];
};
