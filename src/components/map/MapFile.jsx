import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Code", "State", "collectors", "plastic"],
  ["NG-EN", "Enugu", 12, 132160],
  ["NG-FC", "ABUJA", 63, 519461],
  ["NG-KD", "Kaduna", 214, 1054464],
  ["NG-LA", "LAGOS", 972, 950152],
  ["NG-OY", "OYO", 55, 313410],
  ["NG-RI", "Rivers", 1528, 8886313],
];

export const options = {
  animation: { duration: 3000, easing: "out", startup: true },
  region: "NG",
  //displayMode: 'regions',
  resolution: "provinces",
  title: "Number of Transactions",
};
const MapFile = () => {
  return (
    <Chart
      chartType="GeoChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};
export default MapFile;
