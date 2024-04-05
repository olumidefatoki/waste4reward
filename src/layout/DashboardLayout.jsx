import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/sidebar/DashboardSidebar";
import useNav from "../hooks/useNav";

const DashboardLayout = () => {
  const { closeNav, setCloseNav } = useNav();
  console.log({ closeNav });
  return (
    <div className="">
      <div className="">
        <div className="flex">
          <aside
            className={`h-screen  ${
              closeNav ? "w-[100px]" : "w-[280px] mb-20"
            } border-r border-gray-300 flex justify-center fixed`}
          >
            <DashboardSidebar setCloseNav={setCloseNav} closeNav={closeNav} />
          </aside>
          <main
            className={`${
              closeNav ? "w-full pl-[100px]" : "w-full pl-[280px]"
            }`}
          >
            <div className="p-2">
              <Header />
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
