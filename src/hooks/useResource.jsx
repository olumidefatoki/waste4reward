import React, { useEffect, useState } from "react";
import { login } from "../ds/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../feature/auth";
import { gatAllAggregator } from "../ds/aggregators";
import { gatAllCollector } from "../ds/collectors";
import {
  getLga,
  getParticipantReport,
  getPerformanceReport,
  getPlasticCollectionReport,
  getPlasticProcessedReport,
  getProgram,
  getSourceOfPlastic,
  getState,
  getTopAggregators,
  getTopCollectors,
  getTopLocation,
  getTopState,
  getTypeOfPlastic,
} from "../ds/resource";
const useResource = () => {
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const [paReport, setPaReport] = useState({});
  const [peReport, setPeReport] = useState({});
  const [topFiveCollector, setTopFiveCollectors] = useState([]);
  const [collectionReport, setCollectionReport] = useState([]);
  const [processedReport, setProcessedReport] = useState([]);
  const [procssedYear, setProcessedYear] = useState(2022);
  const [collectionYear, setCollectionYear] = useState(2022);

  useEffect(() => {
    const getAllParticipantReports = async () => {
      const res = await getAllParticipantReport();
      setPaReport(res.data);
    };
    getAllParticipantReports();
  }, []);
  useEffect(() => {
    const getAllPerformanceReports = async () => {
      const res = await getAllPerformanceReport();
      setPeReport(res.data);
    };
    getAllPerformanceReports();
  }, []);
  useEffect(() => {
    const getTopCollectors = async () => {
      const res = await getTopFiveCollectors();
      setTopFiveCollectors(res.data);
    };
    getTopCollectors();
  }, []);
  useEffect(() => {
    const getReport = async () => {
      const res = await getPlasticCollectionReport(collectionYear);
      setCollectionReport(JSON.parse(res).data);
    };
    getReport();
  }, [collectionYear]);
  useEffect(() => {
    const getReport = async () => {
      const resPlastic = await getPlasticProcessedReport(procssedYear);
      setProcessedReport(JSON.parse(resPlastic).data);
    };
    getReport();
  }, [procssedYear]);

  const getAllStates = async () => {
    setLoading(true);
    const res = await getState();
    return res;
  };
  const getAllLgas = async () => {
    setLoading(true);
    const res = await getLga();
    return res;
  };
  const getAllTypeOfPlastics = async () => {
    setLoading(true);
    const res = await getTypeOfPlastic();
    return res;
  };
  const getAllSourceOfPlastics = async () => {
    setLoading(true);
    const res = await getSourceOfPlastic();
    return res;
  };
  const getTopFiveAggregators = async () => {
    setLoading(true);
    const res = await getTopAggregators();
    return res;
  };
  const getTopFiveCollectors = async () => {
    setLoading(true);
    const res = await getTopCollectors();
    return res;
  };
  const getTopFiveStates = async () => {
    setLoading(true);
    const res = await getTopState();
    return res;
  };
  const getTopFiveLocations = async () => {
    setLoading(true);
    const res = await getTopLocation();
    return res;
  };
  const getAllProgram = async () => {
    setLoading(true);
    const res = await getProgram();
    return res;
  };
  const getAllPerformanceReport = async () => {
    setLoading(true);
    const res = await getPerformanceReport();
    return res;
  };
  const getAllParticipantReport = async () => {
    setLoading(true);
    const res = await getParticipantReport();
    return res;
  };
  return {
    loading,
    getAllStates,
    getAllLgas,
    getAllTypeOfPlastics,
    getAllSourceOfPlastics,
    getTopAggregators,
    getTopCollectors,
    getTopFiveAggregators,
    getTopFiveCollectors,
    getTopFiveStates,
    getTopFiveLocations,
    getAllProgram,
    getAllPerformanceReport,
    getAllParticipantReport,
    paReport,
    peReport,
    topFiveCollector,
    collectionReport,
    processedReport,
    setProcessedYear,
    setCollectionYear,
  };
};

export default useResource;
