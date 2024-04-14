import React, { useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { downloadAggregator } from "../../ds/aggregators";
import { downloadCollector } from "../../ds/collectors";
import { downloadRecycler } from "../../ds/recycler";
import { downloadTransaction } from "../../ds/transaction";
import { downloadWaybill } from "../../ds/waybill";

const TopCard = ({
  title,
  subtitle,
  buttonTitle,
  Icon,
  exportType,
  setShowModal = () => {},
}) => {
  const [exporting, setExporting] = useState(false);

  const exportList = async () => {
    setExporting(true);
    try {
      // Fetch data
      const res =
        exportType === "aggregator"
          ? await downloadAggregator()
          : exportType === "collector"
          ? await downloadCollector()
          : exportType === "recycler"
          ? await downloadRecycler()
          : exportType === "transaction"
          ? await downloadTransaction()
          : await downloadWaybill();

      // Convert JSON data to CSV format
      const csvContent = res
        .map((row) => Object.values(row).join(","))
        .join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });

      // Create file link in browser's memory
      const href = URL.createObjectURL(blob);

      // Create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", `${exportType}.csv`); // Set the filename as required
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(href);

      setExporting(false);
    } catch (error) {
      console.error("Error exporting list:", error);
      setExporting(false);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">{title}</h1>
        <p className="text-sm">{subtitle}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="flex justify-center items-center h-[40px] w-[101px] border border-gray-300 gap-2 rounded-md"
          onClick={() => exportList()}
        >
          <IoCloudDownloadOutline /> {exporting ? "Exporting..." : "Export"}
        </button>
        <button
          className="bg-green-700 text-white flex justify-center items-center h-[40px] w-[167px] gap-2 rounded-md"
          onClick={() => setShowModal()}
        >
          <Icon /> {buttonTitle}
        </button>
      </div>
    </div>
  );
};

export default TopCard;
