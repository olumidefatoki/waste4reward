import React, { Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { getAuthRouter } from "./router/auth";
import { getDashboardRouter } from "./router/dashboard";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [router, setRouter] = useState([]);
  const [hasRouter, setHasRouter] = useState(false);
  useEffect(() => {
    const createRoute = async () => {
      try {
        const dashboardRouters = getDashboardRouter();
        const authRouters = getAuthRouter();
        const defaultRouter = [].concat(authRouters, dashboardRouters);
        setRouter(createBrowserRouter(defaultRouter));
        setHasRouter(true);
      } catch (e) {
        const dashboardRouters = getDashboardRouter();
        const authRouters = getAuthRouter();
        const defaultRouter = [].concat(authRouters, dashboardRouters);
        setRouter(createBrowserRouter(defaultRouter));
        setHasRouter(true);
      }
    };
    createRoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        {hasRouter && (
          <Suspense fallback={<div>Loading...</div>}>
            <Toaster />
            <RouterProvider router={router} />
          </Suspense>
        )}
      </div>
    </>
  );
}

export default App;
