import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/sidebar/DashboardSidebar";
import useNav from "../hooks/useNav";
import { PiUserSquareLight, PiUsers } from "react-icons/pi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsFileBarGraph } from "react-icons/bs";
import { BiPieChartAlt2 } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { GoGear } from "react-icons/go";
import { BsBoxArrowRight } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { PiArrowFatLinesRight, PiArrowFatLinesLeft } from "react-icons/pi";

const navs = [
  {
    route: "/dashboard",
    name: "Dashboard",
    Icon: BsFileBarGraph,
  },
  {
    route: "/collector",
    name: "Collectors",
    Icon: BsArchive,
  },
  {
    route: "/recycler",
    name: "Recycler",
    Icon: RiDeleteBin7Line,
  },
  {
    route: "/transaction",
    name: "Transaction",
    Icon: BiPieChartAlt2,
  },
  {
    route: "/user",
    name: "User",
    Icon: PiUserSquareLight,
  },
  {
    route: "/waybill",
    name: "Waybill",
    Icon: CgFileDocument,
  },
];

const DashboardLayout = () => {
  const { closeNav, setCloseNav } = useNav();
  return (
    <div className="">
      <div className="">
        <div className="flex">
          <aside
            className={`h-screen  ${
              closeNav ? "w-[100px]" : "w-[280px] mb-20"
            } border-r border-gray-300 flex justify-center fixed`}
          >
            <DashboardSidebar
              setCloseNav={setCloseNav}
              closeNav={closeNav}
              navs={navs}
            />
          </aside>
          <main
            className={`${
              closeNav ? "w-full pl-[100px]" : "w-full pl-[280px]"
            }`}
          >
            <div className="">
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
