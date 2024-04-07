import React, { useState } from "react";
import Logo from "../../assets/images/logo_large.png";
import { GoGear } from "react-icons/go";
import { BsBoxArrowRight } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiArrowFatLinesRight, PiArrowFatLinesLeft } from "react-icons/pi";
import useNav from "../../hooks/useNav";
import { useDispatch } from "react-redux";
import { logout } from "../../feature/auth";

const DashboardSidebar = ({ setCloseNav, closeNav, navs = [] }) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(logout());
    navigate("/");
  };
  const navs2 = [
    {
      route: "/settings",
      name: "Settings",
      Icon: GoGear,
    },
    {
      route: "#",
      name: "Logout",
      Icon: BsBoxArrowRight,
      action: logout,
    },
  ];
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
                    className={`flex items-center gap-4 h-10 rounded-md ${
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
            {navs2.map(({ Icon, name, route, action }, index) => {
              return (
                <Link
                  to={`${route}`}
                  key={`set-${index}`}
                  onClick={() => action()}
                >
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
