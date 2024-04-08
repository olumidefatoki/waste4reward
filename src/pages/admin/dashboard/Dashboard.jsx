import React, { useEffect, useState } from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import BottleWater from "../../../assets/images/bottle-of-water.png";
import DashCard from "../../../components/card/DashCard";
import useNav from "../../../hooks/useNav";
import InputSelect from "../../../components/input/InputSelect";
import DataCard from "../../../components/card/DataCard";
import rafiki from "../../../assets/images/rafiki.png";
import Character2 from "../../../assets/images/Character.png";
import LineCharts from "../../../components/charts/LineChart";
import Granular from "../../../assets/images/granular.png";
import Pana from "../../../assets/images/pana.png";
import Group from "../../../assets/images/group.png";
import Character from "../../../assets/images/Characters.png";
import { AiOutlineRight } from "react-icons/ai";
import useResource from "../../../hooks/useResource";
import ProgressBar from "@ramonak/react-progress-bar";
import { Navigate } from "react-router-dom";
import MapFile from "../../../components/map/MapFile";

const AdminDashboard = () => {
  const {
    getAllSourceOfPlastics,
    getAllTypeOfPlastics,
    getTopFiveAggregators,
    getTopFiveCollectors,
    getTopFiveLocations,
    getTopFiveStates,
    getAllProgram,
    paReport,
    peReport,
    topFiveCollector,
  } = useResource();
  const [typeOfPlastic, setTypeOfPlastic] = useState([]);
  const [sourceOfPlastic, setSourceOfPlastic] = useState([]);
  const [topFiveAggregator, setTopFiveAggregators] = useState([]);
  const [topFiveStates, setTopFiveStates] = useState([]);
  const [topFiveLocation, setTopFiveLocation] = useState([]);

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
  useEffect(() => {
    const getTopAggregators = async () => {
      const res = await getTopFiveAggregators();
      setTopFiveAggregators(res.data);
    };
    getTopAggregators();
  }, []);
  useEffect(() => {
    const getTopLocations = async () => {
      const res = await getTopFiveLocations();
      setTopFiveLocation(res.data);
    };
    getTopLocations();
  }, []);
  useEffect(() => {
    const getTopStates = async () => {
      const res = await getTopFiveStates();
      setTopFiveStates(res.data);
    };
    getTopStates();
  }, []);
  useEffect(() => {
    const getPrograms = async () => {
      const res = await getAllProgram();
      setTopFiveStates(res.data);
    };
    getPrograms();
  }, []);

  const peMetrics = [
    {
      title: "Total plastic collected",
      subtitle: peReport.noOfPlasticCollected || 0,
      figure: "474,238,421 Bottles",
      image: BottleWater,
      unit: "Kg",
      css: "bg-[#DCFAE6]",
    },
    {
      title: "Total plastic processed",
      subtitle: peReport.noOfPlasticProcessed || 0,
      figure: "50,208,880 Bottles",
      image: BottleWater,
      unit: "Kg",
      css: "bg-[#F4EBFF]",
    },
    {
      title: "Transaction value",
      subtitle: `NGN ${peReport.transactionValue || 0}`,
      figure: "30,000 kg",
      image: Granular,
      css: "bg-[#FFE6D5]",
    },
    {
      title: "Average Income per collector",
      subtitle: `NGN ${peReport.averageCollector || 0}`,
      image: Pana,
      css: "bg-[#E0F2FE]",
    },
  ];

  const paMetrics = [
    {
      title: "Total Aggregators",
      subtitle: paReport.noOfAggregator || 0,
      figure: `${paReport.aggregatorState || 0} ${
        paReport.aggregatorState === 1 ? "state" : "states"
      }`,
      image: Character,
      css: "bg-[#EAECF5]",
    },
    {
      title: "Total Users",
      subtitle: paReport.noOfUser || 0,
      image: Group,
      css: "bg-white border border-gray-300",
    },
    {
      title: "Total Recyclers",
      subtitle: paReport.noOfRecycler || 0,
      figure: `${paReport.recyclerState || 0} ${
        paReport.recyclerState === 1 ? "state" : "states"
      }`,
      image: rafiki,
      css: "bg-white border border-gray-300",
    },
    {
      title: "Total Collectors",
      subtitle: paReport.noOfCollector || 0,
      figure: `${paReport.collectorState || 0} ${
        paReport.collectorState === 1 ? "state" : "states"
      }`,
      image: Character2,
      css: "bg-[#FFFAEB]",
    },
  ];
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
                options={typeOfPlastic.map((data) => data.name)}
              />
              <InputSelect
                css={"min-w-[185px]"}
                options={sourceOfPlastic.map((data) => data.name)}
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-wrap gap-4 ">
              {peMetrics.map(
                ({ title, subtitle, figure, image, css, unit }, index) => {
                  return (
                    <>
                      <DashCard
                        key={index}
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
                        <p className="font-bold">
                          {peReport.carbonCredit || 0}
                        </p>
                        <p className="text-green-400 text-sm">MT</p>
                      </div>
                    </div>
                  </div>
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
        <div className="flex flex-wrap w-full gap-4">
          {paMetrics.map(({ title, subtitle, figure, image, css }, index) => {
            return (
              <>
                <DataCard
                  key={index}
                  title={title}
                  subtitle={subtitle}
                  figure={figure}
                  image={image}
                  css={`
                    ${css} h-max basis-[49%]
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
          <div className="flex rounded-md w-max">
            <div className="w-max border border-gray-300 bg-[#F9FAFB] p-2 text-sm rounded-tl rounded-bl">
              Project Overview
            </div>
            <button className="w-max border border-gray-300 p-2 text-sm">
              2022
            </button>
            <button className="w-max border border-gray-300 p-2 text-sm">
              2023
            </button>
            <button className="w-max border border-gray-300 p-2 text-sm rounded-tr rounded-br">
              2024
            </button>
          </div>
        </div>
        <div className="h-[500px]">
          <LineCharts fill="#8884d8" />
        </div>
      </div>
      <div className="h-max border border-gray-300 rounded-md mb-10 p-2">
        {/* <div className=" border-b border-gray-300 mb-10 h-20 p-4"> */}
        <div className="flex rounded-md w-max">
          <button className="w-max border border-gray-300 bg-[#F9FAFB] p-2 text-sm rounded-tl rounded-bl">
            2022
          </button>
          <button className="w-max border border-gray-300 p-2 text-sm">
            2023
          </button>
          <button className="w-max border border-gray-300 p-2 text-sm rounded-tr rounded-br">
            2024
          </button>
        </div>
        {/* </div> */}
        <div className="w-11/12 p-4 rounded-md">
          <div className="flex gap-4">
            <div className="basis-[50%] bg-[#ECFDF3] p-4 rounded-md">
              <h1 className="h-[49px] border-b border-[#EAECF0] mb-5 font-bold">
                Top 5 Aggregators
              </h1>
              {topFiveAggregator.map((data, index) => {
                return (
                  <div
                    className="border-b border-[#EAECF0] h-[60px]"
                    key={index}
                  >
                    <div className="flex justify-between items-center mb-3 h-full">
                      <div className="basis-[55%]">
                        <p className="font-bold text-sm">{data.aggregator}</p>
                        <p className="text-sm">{data.address}</p>
                      </div>
                      <p className="text-sm basis-[35%]">
                        {data.quantity} Collected
                      </p>
                      <p className="basis-[10%]">
                        <AiOutlineRight />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="basis-[50%] bg-[#F9F5FF] p-4 rounded-md">
              <h1 className="h-[49px] border-b border-[#EAECF0] mb-5 font-bold">
                Top 5 Collectors
              </h1>
              {topFiveCollector.map((data, index) => {
                return (
                  <div
                    className="border-b border-[#EAECF0] h-[60px]"
                    key={index}
                  >
                    <div className="flex justify-between items-center mb-3 h-full">
                      <div className="basis-[55%]">
                        <p className="font-bold text-sm">{data.collector}</p>
                        <p className="text-sm">{data.address}</p>
                      </div>
                      <p className="text-sm basis-[35%]">
                        {data.quantity} Collected
                      </p>
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
      </div>
      <div className="h-max border border-gray-300 rounded-md mb-10 p-2">
        <div className="flex justify-between items-center border-b border-gray-300 mb-10 h-20 p-4">
          <div>
            <p className="font-bold">Collection Location</p>
          </div>
          <div className="flex rounded-md w-max">
            <div className="w-max border border-gray-300 bg-[#F9FAFB] p-2 text-sm rounded-tl rounded-bl">
              Project Overview
            </div>
            <button className="w-max border border-gray-300 p-2 text-sm">
              2022
            </button>
            <button className="w-max border border-gray-300 p-2 text-sm">
              2023
            </button>
            <button className="w-max border border-gray-300 p-2 text-sm rounded-tr rounded-br">
              2024
            </button>
          </div>
        </div>
        <div className="flex justify-between mb-5 ">
          <div className="basis-[70%] h-[500px]">
            <MapFile />
          </div>
          <div className="basis-[35%] bg-[#F9FAFB] p-4 rounded-md mr-3">
            <h1 className="mb-3 text-xl font-bold">26 states</h1>
            <div className="flex flex-col gap-4">
              {[
                {
                  location: "Abuja",
                  qty: "3000 plastic",
                  color: "green",
                  completed: 32,
                },
                {
                  location: "Enugu",
                  qty: "2000 plastic",
                  color: "orange",
                  completed: 28,
                },
                {
                  location: "Lagos",
                  qty: "5000 plastic",
                  color: "purple",
                  completed: 24,
                },
                {
                  location: "Benue",
                  qty: "1000 plastic",
                  color: "blue",
                  completed: 20,
                },
                {
                  location: "Niger",
                  qty: "5000 plastic",
                  color: "red",
                  completed: 18,
                },
                {
                  location: "Kaduna",
                  qty: "2000 plastic",
                  color: "black",
                  completed: 16,
                },
              ].map((data, index) => {
                return (
                  <div
                    className={`flex flex-col gap-2 p-2 ${
                      index === 0 ? "bg-[#ECFDF3]" : ""
                    }`}
                  >
                    <p className="text-sm">{data.location}</p>
                    <div className="flex justify-between items-center">
                      <ProgressBar
                        completed={data.completed}
                        bgColor={data.color}
                        height="10px"
                        isLabelVisible={false}
                        className="w-[150px]"
                      />
                      <p>{data.qty}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300 "></div>
        <div className="w-11/12 p-4 rounded-md">
          <div className="flex gap-4">
            <div className="basis-[50%] p-4 rounded-md">
              <h1 className="h-[49px] border-b border-[#EAECF0] mb-5 font-bold">
                Top 5 states
              </h1>
              {topFiveStates.map((data, index) => {
                return (
                  <div
                    className="border-b border-[#EAECF0] h-[60px]"
                    key={index}
                  >
                    <div className="flex justify-between items-center mb-3 h-full">
                      <div className="basis-[55%]">
                        <p className="font-bold text-sm">{data.state}</p>
                        <p className="text-sm">{data.address}</p>
                      </div>
                      <p className="text-sm basis-[35%]">
                        {data.quantity} Collected
                      </p>{" "}
                      <p className="basis-[10%]">
                        <AiOutlineRight />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="basis-[50%] p-4 rounded-md">
              <h1 className="h-[49px] border-b border-[#EAECF0] mb-5 font-bold">
                Top 5 Location
              </h1>
              {topFiveLocation.map((data, index) => {
                return (
                  <div
                    className="border-b border-[#EAECF0] h-[60px]"
                    key={index}
                  >
                    <div className="flex justify-between items-center mb-3 h-full">
                      <div className="basis-[55%]">
                        <p className="font-bold text-sm">{data.location}</p>
                        <p className="text-sm">{data.address}</p>
                      </div>
                      <p className="text-sm basis-[35%]">
                        {data.quantity} Collected
                      </p>
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
      </div>
      <div className="h-max border border-gray-300 rounded-md p-2">
        <div className="flex justify-between items-center border-b border-gray-300 mb-10 h-20 p-4">
          <div>
            <p className="font-bold">Plastic processed</p>
            <p className="text-sm">Track the rate pf collection over time.</p>
          </div>
          <div className="flex rounded-md w-max">
            <div className="w-max border border-gray-300 bg-[#F9FAFB] p-2 text-sm rounded-tl rounded-bl">
              Project Overview
            </div>
            <button className="w-max border border-gray-300 p-2 text-sm">
              2022
            </button>
            <button className="w-max border border-gray-300 p-2 text-sm">
              2023
            </button>
            <button className="w-max border border-gray-300 p-2 text-sm rounded-tr rounded-br">
              2024
            </button>
          </div>
        </div>
        <div className="h-[500px]">
          <LineCharts fill="#F79009" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
