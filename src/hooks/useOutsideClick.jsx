import { useEffect, useState } from "react";

const useOutsideClick = (
  ref,
  onBackgroundClose = () => {},
  defaultDisplay = false
) => {
  const [display, setDisplay] = useState(defaultDisplay);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDisplay(false);
        onBackgroundClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onBackgroundClose]);

  return [display, setDisplay];
};

export default useOutsideClick;
