import React from "react";

const InputSearch = ({ placeholder }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="border border-gray-300 h-[44px] p-2 rounded-md background-image: url('https://static.thenounproject.com/png/101791-200.png') background-repeat: no-repeat"
      />
    </div>
  );
};

export default InputSearch;
