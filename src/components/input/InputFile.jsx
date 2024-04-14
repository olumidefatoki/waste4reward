import React from "react";

const InputFile = ({ placeholder, label, handleChange, value, name }) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <input
        type="file"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        name={name}
        className="border border-gray-300 h-[44px] min-w-[288px] p-2 rounded-md background-image: url('https://static.thenounproject.com/png/101791-200.png') background-repeat: no-repeat"
        style={{ outline: "none" }}
      />
    </div>
  );
};

export default InputFile;
