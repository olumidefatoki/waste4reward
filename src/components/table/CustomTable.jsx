import React from "react";
import { IoIosArrowRoundDown } from "react-icons/io";
import {
  Flex,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from "@aws-amplify/ui-react";
// import color from "@/style/theme/colors";
// import { fontSize, fontWeight } from "@/style/theme/font";
// import { useRouter } from "next/router";

const CustomTable = ({
  headers,
  rows,
  tableTitle,
  containerWidth,
  boxShadow,
  tableButton,
  setAllChecked,
}) => {
  // const router = useRouter();
  return (
    <Flex
      width={containerWidth}
      borderRadius={"10px"}
      boxShadow={boxShadow || `0px 20px 25px rgba(0, 0, 0, 0.05)`}
      backgroundColor={"#FFFFFF"}
      /* margin={{ base: '0', medium: '15px', large: '0' }} */
      margin="0 auto"
      style={{ overflowX: "auto" }}
    >
      <Table className="my-custom-table">
        <TableHead width={"100%"}>
          {tableTitle ? (
            <TableRow border={"0"}>
              <TableCell
                as="th"
                color={"#141414"}
                fontWeight={600}
                fontSize={""}
                lineHeight={"22px"}
                colSpan={headers.length + 2}
              >
                {tableButton ? (
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    {tableTitle}
                    {tableButton}
                  </Flex>
                ) : (
                  tableTitle
                )}
              </TableCell>
            </TableRow>
          ) : (
            ""
          )}
          <TableRow>
            <TableCell backgroundColor={"#F9FAFB"}>
              <input type="checkbox" onClick={() => setAllChecked(true)} />
            </TableCell>
            {headers?.map((header, index) => (
              <>
                {index === 0 ? (
                  <TableCell
                    as="th"
                    color={""}
                    height={"2.5rem"}
                    key={`headers-${index}`}
                    fontSize={"0.875rem"}
                    colSpan={headers.length === index + 1 ? "3" : "1"}
                    whiteSpace={"nowrap"}
                    backgroundColor={"#F9FAFB"}
                  >
                    <div className="flex items-center">
                      {header}
                      <IoIosArrowRoundDown />
                    </div>
                  </TableCell>
                ) : (
                  <TableCell
                    as="th"
                    color={""}
                    height={"2.5rem"}
                    key={`headers-${index}`}
                    fontSize={"0.875rem"}
                    colSpan={headers.length === index + 1 ? "3" : "1"}
                    whiteSpace={"nowrap"}
                    backgroundColor={"#F9FAFB"}
                  >
                    {header}
                  </TableCell>
                )}
              </>
            ))}
          </TableRow>
        </TableHead>
        <TableBody width={"100%"} style={{ cursor: "pointer" }}>
          {rows?.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              backgroundColor={rowIndex % 2 ? "#EAECF0" : "#FCFCFD"}
              // onClick={() => {
              //   if (row?.link?.props?.href) {
              //     router.push(row.link.props.href);
              //   } else if (row?.link?.props?.onClick) {
              //     row?.link?.props?.onClick();
              //   } else if (row?.link?.props?.children?.props?.onClick) {
              //     row?.link?.props?.children?.props?.onClick();
              //   }
              // }}
            >
              {Object.values(row).map((value, valueIndex) => {
                return (
                  <TableCell
                    lineHeight={"1rem"}
                    fontSize={"0.875rem"}
                    fontWeight={""}
                    key={`${rowIndex} ${valueIndex}`}
                    whiteSpace={"nowrap"}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Flex>
  );
};

export default CustomTable;

// const CustomTable = ({ headers = [], rows = [], handleChecked }) => {
//   return (
//     <>
//       <div className="w-full border border-gray-300">
//         <table className="w-full">
//           <thead>
//             <tr className="w-max border-t border-b border-[#EAECF0] bg-[#F9FAFB] h-[72px] text-xs">
//               <th>
//                 <input
//                   type="checkbox"
//                   className="h-[20px]"
//                   onClick={handleChecked}
//                 />
//               </th>
//               {headers.map((data, index) => {
//                 return (
//                   <th key={`row-${index}`}>
//                     <div class="">
//                       {data}
//                       {index === 0 ? <IoIosArrowRoundDown /> : ""}
//                     </div>
//                   </th>
//                 );
//               })}
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((data, index) => {
//               return (
//                 <tr
//                   key={`tr-${index}`}
//                   className={`text-center h-[72px] text-xs ${
//                     index % 2
//                       ? "bg-[#EAECF0] border-[#FCFCFD]"
//                       : "bg-[#FCFCFD] order-[#EAECF0]"
//                   } border-b`}
//                 >
//                   <td>
//                     <input type="checkbox" />
//                   </td>
//                   {Object.values(rows).map((values, index) => {
//                     return <td key={`row-${index}`}>{values}</td>;
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default CustomTable;
