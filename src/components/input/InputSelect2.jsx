import React from "react";

const InputSelect2 = ({
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
    <div className="flex flex-col gap-2">
      {label && <label>{label}</label>}
      <select
        className={`border border-gray-300 h-[44px] ${
          css ? css : "w-[280px]"
        } p-2 rounded-md`}
        onChange={handleChange}
        name={name}
        {...props}
      >
        <option value={null}>{placeholder}</option>
        {options.map((option, index) => {
          return (
            <option className="p-2" key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default InputSelect2;
