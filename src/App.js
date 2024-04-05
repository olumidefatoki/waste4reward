import React, { Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { getAuthRouter } from "./router/auth";
import { getDashboardRouter } from "./router/dashboard";

function App() {
  const [router, setRouter] = useState([]);
  const [hasRouter, setHasRouter] = useState(false);
  useEffect(() => {
    const createRoute = async () => {
      try {
        const authRouters = getDashboardRouter();
        const defaultRouter = [].concat(authRouters);
        setRouter(createBrowserRouter(defaultRouter));
        setHasRouter(true);
      } catch (e) {
        const authRouters = getAuthRouter();
        const defaultRouter = [].concat(authRouters);
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
            <RouterProvider router={router} />
          </Suspense>
        )}
      </div>
    </>
  );
}

export default App;
