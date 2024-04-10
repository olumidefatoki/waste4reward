import React from "react";

const InputSelect = ({
  options = [],
  label,
  css,
  handleChange,
  value,
  name,
  placeholder,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      {label && <label>{label}</label>}
      <select
        className={`border border-gray-300 h-[44px] ${
          css ? css : "w-[280px]"
        } p-2 rounded-md`}
        onChange={handleChange}
        name={name}
        {...props}
      >
        <option>{placeholder}</option>
        {options.map((data, index) => {
          return (
            <option className="p-2" key={index}>
              {data}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default InputSelect;
