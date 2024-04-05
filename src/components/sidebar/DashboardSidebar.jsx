import React, { useState } from "react";
import Logo from "../../assets/images/logo_large.png";
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
import useNav from "../../hooks/useNav";

const navs = [
  {
    route: "/dashboard",
    name: "Dashboard",
    Icon: BsFileBarGraph,
  },
  {
    route: "/aggregator",
    name: "Aggregator",
    Icon: PiUsers,
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

const navs2 = [
  {
    route: "/settings",
    name: "Settings",
    Icon: GoGear,
  },
  {
    route: "/logout",
    name: "Logout",
    Icon: BsBoxArrowRight,
  },
];
const DashboardSidebar = ({ setCloseNav, closeNav }) => {
  let location = useLocation();
  //   const { closeNav, setCloseNav } = useNav();
  return (
    <div
      className={`fixed top-0 bottom-0 h-screen mb-30 
      ${closeNav ? "w-[80px]" : "w-[270px]"}`}
    >
      <div className="flex justify-between items-center mb-10 px-2">
        <div className="max-w-[83px] h-max">
          <img
            src={Logo}
            alt={"logo"}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </div>
        {closeNav ? (
          <PiArrowFatLinesRight
            style={{
              width: 24,
              height: 24,
              cursor: "pointer",
            }}
            onClick={() => setCloseNav((prev) => !prev)}
          />
        ) : (
          <PiArrowFatLinesLeft
            style={{
              width: 24,
              height: 24,
              cursor: "pointer",
            }}
            onClick={() => setCloseNav((prev) => !prev)}
          />
        )}
      </div>
      <div
        className={`flex flex-col ${
          closeNav ? "items-center" : ""
        } place-content-between h-full`}
      >
        <div>
          <ul>
            {navs.map(({ Icon, name, route }, index) => {
              return (
                <Link to={`${route}`} key={`nav-${index}`}>
                  <li
                    className={`flex items-center gap-4 h-10 ${
                      location.pathname === route
                        ? "bg-green-700 text-white"
                        : ""
                    }  p-2`}
                  >
                    <Icon
                      style={{
                        width: 24,
                        height: 24,
                        color: `${location.pathname === route ? "white" : ""}`,
                      }}
                    />
                    {closeNav ? "" : name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="mb-20">
          <ul>
            {navs2.map(({ Icon, name, route }, index) => {
              return (
                <Link to={`${route}`} key={`set-${index}`}>
                  <li className="flex items-center gap-4 h-10 p-2">
                    <Icon style={{ width: 24, height: 24 }} />
                    {closeNav ? "" : name}
                  </li>
                </Link>
              );
            })}
          </ul>
          <p className={` ${closeNav ? "w-[50px] text-xs" : "text-sm"}`}>
            2024 © Waste4Reward.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
