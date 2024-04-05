import React, { useState } from "react";

const useNav = () => {
  const [closeNav, setCloseNav] = useState(false);
  return {
    setCloseNav,
    closeNav,
  };
};

export default useNav;
