import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard";
import Aggregator from "../pages/aggregator";
import Collector from "../pages/collector";
import Recycler from "../pages/recycler";
import Transaction from "../pages/transaction";
import User from "../pages/user";
import Waybill from "../pages/waybill";
import Admin from "../pages/admin";
import AdminDashboard from "../pages/admin/dashboard/Dashboard";

export const getDashboardRouter = () => {
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
    {
      path: "admin",
      element: <Admin />,
      // errorElement: <ErrorPage />,
      children: [
        {
          children: [
            {
              path: "dashboard",
              element: <AdminDashboard />,
              // errorElement: <ErrorPage />,
            },
            {
              path: "aggregator",
              element: <Aggregator />,
              // errorElement: <ErrorPage />,
            },
            {
              path: "collector",
              element: <Collector />,
              // errorElement: <ErrorPage />,
            },
            {
              path: "recycler",
              element: <Recycler />,
              // errorElement: <ErrorPage />,
            },
            {
              path: "transaction",
              element: <Transaction />,
              // errorElement: <ErrorPage />,
            },
            {
              path: "user",
              element: <User />,
              // errorElement: <ErrorPage />,
            },
            {
              path: "waybill",
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
