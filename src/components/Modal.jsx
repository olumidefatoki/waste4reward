import React from "react";
import { Portal } from "./Portal";

const Modal = ({
  closeModal,
  children,
  defaultBack,
  refProp,
  variant,
  forEmbed,
}) => {
  const styles = {
    default: `flex flex-col items-center md:min-w-modal bg-gray rounded py-16 md:px-24 px-10 overflow-y-auto max-h-modal mx-10`,
    modal: `flex flex-col items-center md:min-w-modal bg-gray rounded py-16 md:px-10 px-4 overflow-y-auto max-h-modal mx-10 w-[70%] max-w-[800px]`,
    smallerModal: `flex flex-col items-center md:min-w-modal bg-gray rounded py-16 md:px-10 px-4 overflow-y-auto max-h-modal mx-10 w-[70%] max-w-[550px]`,
    embedModal: `flex flex-col items-right md:min-w-modal bg-white rounded max-h-modal mx-10 w-[80%] h-[80vh]`,
  };

  const VARIANT = styles[variant];

  return (
    <Portal isForEmbed={forEmbed}>
      <div ref={refProp} className={VARIANT}>
        {defaultBack && (
          <div className="flex w-full justify-start sm:hidden">
            <button type="button" onClick={() => closeModal()}>
              {/* <ArrowLeftIcon /> */}
            </button>
          </div>
        )}
        <div className="w-full flex flex-col items-center justify-center h-[100%] ">
          {children}
        </div>
      </div>
    </Portal>
  );
};

export const RightModal = ({
  closeModal,
  children,
  defaultBack,
  refProp,
  variant,
}) => {
  const styles = {
    default: `flex flex-col  md:min-w-modal bg-gray rounded py-16 px-10 overflow-y-auto h-full w-[70%] max-w-[500px]`,
    modal: `flex flex-col md:min-w-modal bg-gray rounded py-16 md:px-10 px-4 overflow-y-auto h-full w-[70%] max-w-[500px]`,
  };

  const VARIANT = styles[variant];

  return (
    <Portal isRight>
      <div
        ref={refProp}
        className={`transition-all duration-[1000ms] ease-out ${VARIANT}`}
      >
        {defaultBack && (
          <div className="flex w-full justify-start sm:hidden">
            <button type="button" onClick={() => closeModal()}>
              {/* <ArrowLeftIcon /> */}
            </button>
          </div>
        )}
        <div className="w-full flex flex-col items-center justify-center ">
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
