// import React, { useEffect } from "react";

// const GeoChart = () => {
//   useEffect(() => {
//     google.charts.load("current", {
//       packages: ["geochart"],
//     });
//     google.charts.setOnLoadCallback(drawRegionsMap);

//     function drawRegionsMap() {
//       var data = google.visualization.arrayToDataTable([
//         ["Code", "State", "collectors", "plastic"],
//         ["NG-EN", "Enugu", 12, 132160],
//         ["NG-FC", "ABUJA", 63, 519461],
//         ["NG-KD", "Kaduna", 214, 1054464],
//         ["NG-LA", "LAGOS", 972, 950152],
//         ["NG-OY", "OYO", 55, 313410],
//         ["NG-RI", "Rivers", 1528, 8886313],
//       ]);

//       var options = {
//         animation: { duration: 3000, easing: "out", startup: true },
//         region: "NG",
//         displayMode: "regions",
//         resolution: "provinces",
//         title: "Number of Transactions",
//       };

//       var chart = new google.visualization.GeoChart(
//         document.getElementById("regions_div")
//       );

//       chart.draw(data, options);
//     }
//   }, [third]);

//   return <div>GeoChart</div>;
// };

// export default GeoChart;
