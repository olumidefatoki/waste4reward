import React, { useEffect } from "react";
import DashboardSidebar from "../../components/sidebar/DashboardSidebar";
import Header from "../../components/header/Header";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import useNav from "../../hooks/useNav";
import { PiUserSquareLight, PiUsers } from "react-icons/pi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsFileBarGraph } from "react-icons/bs";
import { BiPieChartAlt2 } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { GoGear } from "react-icons/go";
import { BsBoxArrowRight } from "react-icons/bs";
import { BsArchive } from "react-icons/bs";
import { PiArrowFatLinesRight, PiArrowFatLinesLeft } from "react-icons/pi";

const navs = [
  {
    route: "/admin/dashboard",
    name: "Dashboard",
    Icon: BsFileBarGraph,
  },
  {
    route: "/admin/aggregator",
    name: "Aggregator",
    Icon: PiUsers,
  },
  {
    route: "/admin/collector",
    name: "Collectors",
    Icon: BsArchive,
  },
  {
    route: "/admin/recycler",
    name: "Recycler",
    Icon: RiDeleteBin7Line,
  },
  {
    route: "/admin/transaction",
    name: "Transaction",
    Icon: BiPieChartAlt2,
  },
  {
    route: "/admin/user",
    name: "User",
    Icon: PiUserSquareLight,
  },
  {
    route: "/admin/waybill",
    name: "Waybill",
    Icon: CgFileDocument,
  },
];
const Admin = () => {
  const navigate = useNavigate();
  const { closeNav, setCloseNav } = useNav();
  useEffect(() => {
    navigate("/admin/dashboard");
  }, []);

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

export default Admin;
