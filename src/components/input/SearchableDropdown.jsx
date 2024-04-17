import React from "react";
import Select from "react-select";
// import "./InputField.css";

const customStyles = {
  // Style for the control (the input container)
  control: (provided, state) => ({
    // Example: Apply a border and box shadow when focused
    ...provided,
    border: "1px solid #d3d3d3",
    // border: state.isFocused ? "1px solid #d3d3d3" : "1px solid #d3d3d3",
    "&:hover": {
      border: "1px solid #d3d3d3", // Remove the blue outline border on hover
    },
    boxShadow: "0 0 1px #d3d3d3",
    borderRadius: "6px",
    // marginTop: "8px",

    // padding: "5px",
    width: "100%",
    height: "44px",
    outline: state.isFocused ? "none" : "none",
    // fontFamily: "",
    fontSize: "12px",
    // padding: "12px 16px",
  }),

  // Style for the option in the dropdown menu
  option: (provided, state) => ({
    // Example: Change background color and font color when hovered
    ...provided,
    backgroundColor: state.isFocused ? "#f0f0f0" : "white",
    color: state.isFocused ? "#292929" : "#292929",
    fontWeight: state.isFocused ? "500" : "400",
    cursor: "pointer",
  }),

  // Style for the menu (the dropdown list)
  menu: (provided, state) => ({
    // Example: Change the border and background color of the menu
    ...provided,
    border: "2px solid #ccc",
    backgroundColor: "white",
  }),
};

const SearchableDropdown = ({
  options,
  placeholder,
  label,
  handleChange,
  selectedOption,
}) => {
  return (
    <div>
      <label htmlFor="" className="label">
        {label}
      </label>
      <Select
        options={options}
        value={selectedOption}
        styles={customStyles}
        // isClearable
        placeholder={placeholder}
        onChange={handleChange}
        noOptionsMessage={() => "Fetching data.."}
      />
    </div>
  );
};

export default SearchableDropdown;
