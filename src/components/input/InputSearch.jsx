import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const InputSearch = ({ placeholder, inputValue, setInputValue }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md h-[44px]">
      <span className="w-[40px] block flex justify-center">
        <AiOutlineSearch />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className="p-2 background-image: url('https://static.thenounproject.com/png/101791-200.png') background-repeat: no-repeat"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        style={{ outline: "none" }}
      />
    </div>
  );
};

export default InputSearch;
