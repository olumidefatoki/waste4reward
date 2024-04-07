import React, { useEffect, useState } from "react";
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
import { AiOutlineRight } from "react-icons/ai";
import BarChart from "../../components/charts/BarChart";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useResource from "../../hooks/useResource";

const data = [
  {
    title: "Total plastic collected",
    subtitle: "11,855.96",
    figure: "474,238,421 Bottles",
    image: BottleWater,
    unit: "Kg",
    css: "bg-[#DCFAE6]",
  },
  {
    title: "Total plastic collected",
    subtitle: "1,255.22",
    figure: "50,208,880 Bottles",
    image: BottleWater,
    unit: "Kg",
    css: "bg-[#F4EBFF]",
  },
  {
    title: "Total plastic collected",
    subtitle: "NGN 23,542,000",
    figure: "30,000 kg",
    image: Granular,
    css: "bg-[#FFE6D5]",
  },
  {
    title: "Average Income per collector",
    subtitle: "NGN 3,542",
    // figure: "474,238,421 Bottles",
    image: Pana,
    css: "bg-[#E0F2FE]",
  },
];
const data2 = [
  {
    title: "Total Collector",
    subtitle: "4,086",
    figure: "16 states",
    image: Character2,
    css: "bg-[#FFFAEB]",
  },
  {
    title: "Total Recyclers",
    subtitle: "586",
    figure: "16 states",
    image: rafiki,
    css: "bg-white border border-gray-300",
  },
];

const barData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 200 },
  { name: "Group F", value: 200 },
  { name: "Group G", value: 200 },
  { name: "Group H", value: 200 },
  { name: "Group I", value: 200 },
  { name: "Group J", value: 200 },
];
const Dashboard = () => {
  const { closeNav } = useNav();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [typeOfPlastic, setTypeOfPlastic] = useState([]);
  const [sourceOfPlastic, setSourceOfPlastic] = useState([]);
  const { getAllSourceOfPlastics, getAllTypeOfPlastics } = useResource();
  useEffect(() => {
    if (user?.userType === "SUPER_ADMIN") {
      navigate("/admin", { replace: true });
    }
  }, []);
  useEffect(() => {
    const getSourceOfPlastic = async () => {
      const res = await getAllSourceOfPlastics();
      setSourceOfPlastic(res.data);
    };
    getSourceOfPlastic();
  }, []);
  useEffect(() => {
    const getTypeOfPlastic = async () => {
      const res = await getAllTypeOfPlastics();
      setTypeOfPlastic(res.data);
    };
    getTypeOfPlastic();
  }, []);

  return (
    <div className="p-4 h-max">
      <div className="mb-5">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl">Dashboard</h1>
          <p className="pr-2">Gain insights from the metrics below.</p>
        </div>
      </div>
      <div className="flex flex-col items-center border border-gray-200 p-4 mb-10 rounded-md">
        <div className="w-11/12">
          <div className="flex justify-between items-center mb-3">
            <p className="font-bold">Performance Metrics</p>
            <div className="flex gap-2">
              <InputSelect
                css={"min-w-[185px]"}
                options={["type of plastic"]}
              />
              <InputSelect
                css={"min-w-[185px]"}
                options={["source of plastic"]}
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-wrap gap-4 ">
              {data.map(
                ({ title, subtitle, figure, image, css, unit }, index) => {
                  return (
                    <>
                      <DashCard
                        key={`dash-${index}`}
                        title={title}
                        subtitle={subtitle}
                        figure={figure}
                        image={image}
                        unit={unit}
                        css={`
                          ${css} basis-[48%]
                        `}
                      />
                    </>
                  );
                }
              )}
            </div>
            <div className="flex justify-center basis-[30%]">
              <div className="flex  flex-col items-center justify-center h-[268px] bg-blue-100 rounded-md">
                <div className="flex flex-col justify-center p-4 gap-2">
                  <p className="">Carbon Credits</p>
                  <div className="flex flex-col items-center justify-center bg-slate-100 w-[246px] h-[210px] rounded-md">
                    <p className="text-sm">Total Credit</p>
                    <div className="">
                      <div className="flex items-center gap-2 text-xl">
                        <p className="font-bold">2,040</p>
                        <p className="text-green-400 text-sm">MT</p>
                      </div>
                    </div>
                  </div>
                  {/* <p>80% of the reductions occurred in the state of Ibadan.</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col border border-gray-200 gap-4 p-4 mb-10 rounded-md">
        <div className="flex justify-between mb-3">
          <p className="font-bold">Participants Metrics</p>
        </div>
        <div className="flex w-full gap-4">
          {data2.map(({ title, subtitle, figure, image, css }, index) => {
            return (
              <>
                <DataCard
                  key={`dat-${index}`}
                  title={title}
                  subtitle={subtitle}
                  figure={figure}
                  image={image}
                  css={`
                    ${css} h-max basis-1/2
                  `}
                  icon={true}
                  imageHeight={"h-[96px] w-[68px]"}
                />
              </>
            );
          })}
        </div>
      </div>
      <div className="h-max border border-gray-300 rounded-md mb-10 p-2">
        <div className="flex justify-between items-center border-b border-gray-300 mb-10 h-20 p-4">
          <div>
            <p className="font-bold">Collector Performance metric</p>
            <p className="text-sm">Track the rate pf collection over time.</p>
          </div>
          <div></div>
        </div>
        <div className="h-[500px]">
          <LineCharts fill="#8884d8" />
        </div>
      </div>
      <div className="h-max border border-gray-300 rounded-md mb-10 p-2">
        <div className="flex justify-between items-center border-b border-gray-300 mb-10 h-20 p-4">
          <div>
            <p className="font-bold">Collector Performance metric</p>
          </div>
          <div></div>
        </div>
        <div className="w-11/12 bg-[#F9F5FF] p-4 rounded-md">
          <h1 className="h-[49px] border-b border-[#EAECF0] mb-5 font-bold">
            Top 5 collectors
          </h1>
          <div className="w-11/12 ">
            {[1, 1, 1, 1, 1].map((data, index) => {
              return (
                <div className="border-b border-[#EAECF0] h-[60px]" key={index}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="basis-[70%]">
                      <p className="font-bold text-sm">Andi Lane</p>
                      <p className="text-sm">Andilane@gmail.com</p>
                    </div>
                    <p className="text-sm basis-[20%]">3,000 Collected</p>
                    <p className="basis-[10%]">
                      <AiOutlineRight />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-max border border-gray-300 rounded-md mb-10 p-2">
        <div className="flex justify-between items-center border-b border-gray-300 mb-10 h-20 p-4">
          <div>
            <p className="font-bold">State Locations</p>
          </div>
        </div>
        <div className="h-[500px] flex items-center justify-center">
          <div className="basis-[50%] h-full">
            <BarChart
              data={barData}
              outerRadius={200}
              // width={200}
              // height={200}
            />
          </div>
          <div className="basis-[50%] flex items-center justify-center p-2 bg-[#F9FAFB] rounded-md">
            <div className="flex flex-wrap gap-16 basis-[90%]">
              {[
                { color: "#0088FE" },
                { color: "#00C49F" },
                { color: "#FFBB28" },
                { color: "#FF8042" },
                { color: "#0088FE" },
                { color: "#00C49F" },
                { color: "#FFBB28" },
                { color: "#FF8042" },
                { color: "#0088FE" },
                { color: "#00C49F" },
              ].map((data, index) => {
                return (
                  <div
                    className="flex gap-2 basis-[112px] h-[54px]"
                    key={index}
                  >
                    <div
                      className={`rounded-full w-[12px] h-[12px] mt-2`}
                      style={{ backgroundColor: `${data.color}` }}
                    ></div>
                    <div className="mt-1">
                      <p className="text-sm mb-1">Ajingi</p>
                      <p className="font-bold">2,000</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="h-max border border-gray-300 rounded-md p-2">
        <div className="flex justify-between items-center border-b border-gray-300 mb-10 h-20 p-4">
          <div>
            <p className="font-bold">Plastic processed</p>
            <p className="text-sm">Track the rate pf collection over time.</p>
          </div>
          <div></div>
        </div>
        <div className="h-[500px]">
          <LineCharts fill="#F79009" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
