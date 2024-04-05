/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import ReactDOM from "react-dom";
export const Portal = ({ children, id = "portal", isRight, isForEmbed }) => {
  const center = `fixed z-50 min-h-portal flex flex-col w-full justify-center ${
    isForEmbed ? "items-end" : "items-center"
  } top-0 left-0 bg-black/50 backdrop-blur-sm`;
  const defaultClass = isRight
    ? "fixed z-50 h-full flex flex-col w-full items-end top-0 left-0 bg-black/50 backdrop-blur-sm"
    : center;
  const MODAL = ReactDOM.createPortal(
    <div
      className={defaultClass}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>,
    document.getElementById(id)
  );
  return MODAL;
};
