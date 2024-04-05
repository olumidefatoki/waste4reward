// import { useEffect } from "react";
// import PropTypes from "prop-types";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Auth } from "aws-amplify";

// const AuthGuard = ({ children }) => {
//   /* const { islogin } = useSelector((state) => state.auth); */
//   const navigate = useNavigate();
//   const location = useLocation();
//   const pathname = location.pathname;

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         await Auth.currentAuthenticatedUser();
//       } catch (error) {
//         navigate(`/signin/?redirectUrl=${pathname}`, { replace: true });
//       }
//     };

//     checkUser();

//     return () => {};
//   }, [navigate]);

//   return children;
// };

// AuthGuard.defaultProps = {
//   children: null,
// };

// AuthGuard.propTypes = {
//   children: PropTypes.node,
// };

// export default AuthGuard;
