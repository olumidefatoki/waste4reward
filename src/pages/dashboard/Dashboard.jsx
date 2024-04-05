import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import BottleWater from "../../assets/images/bottle-of-water.png";
import DashCard from "../../components/card/DashCard";
import useNav from "../../hooks/useNav";
import InputSelect from "../../components/input/InputSelect";
import DataCard from "../../components/card/DataCard";
import Group from "../../assets/images/group.png";
import Character from "../../assets/images/Characters.png";
import rafiki from "../../assets/images/rafiki.png";
import Character2 from "../../assets/images/Character.png";
import LineCharts from "../../components/charts/LineChart";
import Granular from "../../assets/images/granular.png";
import Pana from "../../assets/images/pana.png";

const data = [
  {
    title: "Total plastic collected",
    subtitle: "11,855.96",
    figure: "474,238,421 Bottles",
    image: BottleWater,
    css: "bg-[#DCFAE6] w-6/12",
  },
  {
    title: "Total plastic collected",
    subtitle: "11,855.96",
    figure: "474,238,421 Bottles",
    image: BottleWater,
    css: "bg-[#F4EBFF] w-6/12",
  },
  {
    title: "Total plastic collected",
    subtitle: "11,855.96",
    figure: "474,238,421 Bottles",
    image: Granular,
    css: "bg-[#FFE6D5] w-6/12",
  },
  {
    title: "Total plastic collected",
    subtitle: "11,855.96",
    figure: "474,238,421 Bottles",
    image: Pana,
    css: "bg-[#E0F2FE] w-6/12",
  },
];
const data2 = [
  {
    title: "Total Aggregator",
    subtitle: "14",
    figure: "20 states",
    image: Character,
    css: "bg-[#EAECF5] w-6/12",
  },
  {
    title: "Total Users",
    subtitle: "586",
    figure: "16 states",
    image: Group,
    css: "bg-white w-6/12 border border-gray-300",
  },
  {
    title: "Total Recyclers",
    subtitle: "586",
    figure: "16 states",
    image: rafiki,
    css: "bg-white w-6/12 border border-gray-300",
  },
  {
    title: "Total Collector",
    subtitle: "4,086",
    figure: "16 states",
    image: Character2,
    css: "bg-[#FFFAEB] w-6/12",
  },
];
const Dashboard = () => {
  const { closeNav } = useNav();
  console.log({ closeNav });
  return (
    <div className="p-4 h-max">
      <div className="mb-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl">Dashboard</h1>
          <p className="pr-2">Gain insights from the metrics below.</p>
        </div>
      </div>
      <div className="flex flex-col border border-gray-200 gap-4 p-4 mb-10 rounded-md">
        <div className="flex justify-between mb-5">
          <p className="font-bold">Performance Metrics</p>
          <div className="flex gap-2">
            <InputSelect css={"min-w-[185px]"} options={["type of plastic"]} />
            <InputSelect
              css={"min-w-[185px]"}
              options={["source of plastic"]}
            />
          </div>
        </div>
        <div className="flex ">
          <div className="flex flex-wrap gap-4 basis-9/12">
            {data.map(({ title, subtitle, figure, image, css }) => {
              return (
                <>
                  <DashCard
                    title={title}
                    subtitle={subtitle}
                    figure={figure}
                    image={image}
                    css={css}
                  />
                </>
              );
            })}
          </div>
          <div className="flex justify-center basis-3/12">
            <div className="flex  flex-col items-center justify-center h-[268px] bg-blue-100 rounded-md">
              <div className="flex flex-col justify-center p-4 gap-2">
                <p className="">Carbon Credits</p>
                <div className="flex flex-col items-center justify-center bg-slate-100 w-[246px] h-[158px] rounded-md">
                  <p className="text-sm">Total Credit</p>
                  <div className="">
                    <div className="flex items-center gap-2 text-xl">
                      <p className="font-bold">2,040</p>
                      <p className="text-green-400 text-sm">MT</p>
                    </div>
                  </div>
                </div>
                <p>80% of the reductions occurred in the state of Ibadan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col border border-gray-200 gap-4 p-4 mb-10 rounded-md">
        <div className="flex justify-between mb-5">
          <p className="font-bold">Participants Metrics</p>
        </div>
        <div className="flex w-full">
          <div className="flex flex-wrap gap-6 ">
            {data2.map(({ title, subtitle, figure, image, css }) => {
              return (
                <>
                  <DataCard
                    title={title}
                    subtitle={subtitle}
                    figure={figure}
                    image={image}
                    css={`
                      ${css} w-[525px] h-[173px]
                    `}
                    icon={true}
                    // imageHeight={"h-[99px]"}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-[500px]">
        <LineCharts fill="#8884d8" />
      </div>
      <div className="h-[500px]">
        <LineCharts fill="#F79009" />
      </div>
    </div>
  );
};

export default Dashboard;
