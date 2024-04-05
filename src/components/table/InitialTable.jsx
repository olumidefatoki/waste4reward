// import React from "react";

// const CustomTable = ({ headers = [], rows = [] }) => {
//   return (
//     <div className="w-full border border-gray-300">
//       <table className="w-full">
//         <thead>
//           <tr className="w-max border-t border-b border-[#EAECF0] bg-[#F9FAFB]">
//             <th>
//               <input type="checkbox" className="h-[20px]" />
//             </th>
//             {headers.map((data, index) => {
//               return (
//                 <th key={`row-${index}`} className="text-center">
//                   {data}
//                 </th>
//               );
//             })}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((data, index) => {
//             return (
//               <tr
//                 key={`tr-${index}`}
//                 className={`text-center ${
//                   index % 2 ? "bg-[#EAECF0]" : "bg-[#FCFCFD]"
//                 } border-b border-gray-300`}
//               >
//                 <td>
//                   <input type="checkbox" />
//                 </td>
//                 {Object.values(rows).map((values, index) => {
//                   return <td key={`row-${index}`}>{values}</td>;
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CustomTable;
