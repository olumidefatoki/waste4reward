import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const { islogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!islogin && !accessToken) {
      navigate("/");
    }

    return () => {};
  }, [navigate]);

  return children;
};

export default AuthGuard;
