/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from "react";
import { PiUsers } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import InputText from "../input/InputText";
import InputSelect from "../input/InputSelect";
import InputSelect2 from "../input/InputSelect2";
import toast from "react-hot-toast";
import useTransaction from "../../hooks/useTransaction";
import useCollector from "../../hooks/useCollector";
import useAggregator from "../../hooks/useAggregator";
import useResource from "../../hooks/useResource";
import { getState, getLga } from "../../ds/resource";

export const TransactionModal = ({
  model,
  closeModal,
  requestType,
  aggregatorList,
  collectorList,
}) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { createNewAggregator } = useAggregator();
  const { getAllSourceOfPlastics, getAllTypeOfPlastics } = useResource();
  const { createNewTransaction } = useTransaction();
  const [plasticTypeList, setPlasticTypeList] = useState([]);
  const [plasticSourceList, setPlasticSourceList] = useState([]);
  const [states, setStates] = useState([]);
  const [lga, setLga] = useState([]);

  useEffect(() => {
    const getAllState = async () => {
      const res = await getState();
      setStates(res.data);
    };
    getAllState();
  }, []);
  useEffect(() => {
    const getAllLga = async () => {
      const res = await getLga();
      setLga(res.data);
    };
    getAllLga();
  }, []);

  //get plastic lists
  useEffect(() => {
    const getPlasticTypes = async () => {
      const res = await getAllTypeOfPlastics();
      const list = res.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });

      setPlasticTypeList([...list]);
      // console.log(res.data);
    };

    const getPlasticSources = async () => {
      const res = await getAllSourceOfPlastics();
      const list = res.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });

      setPlasticSourceList([...list]);
      // console.log(res.data);
    };
    getPlasticTypes();
    getPlasticSources();
  }, []);

  const [transactionDetail, setTransactionDetail] = useState({
    amount: "",
    quantity: "",
    price: "",
    collectorId: 0,
    aggregatorId: 0,
    typeOfPlasticId: 0,
    sourceOfPlasticId: 0,
  });

  const createTransaction = async (data) => {
    console.log(transactionDetail);
    setLoading(true);

    try {
      if (requestType === "edit") {
        setLoading(true);
        const res = await createNewTransaction();
        console.log({ res });
      }
      setLoading(true);
      const res = await createNewTransaction(transactionDetail);
      if (res.errors) {
        toast.error(Object.values(res.errors)[0]);
        return;
      }
      toast.success("Transaction created");
      closeModal();
    } catch (error) {
      toast.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-y-2 w-[640px] bg-white p-4 h-max">
        <div className="flex justify-between">
          <PiUsers style={{ width: 26, height: 26 }} />
          <IoCloseOutline
            style={{ width: 26, height: 26, cursor: "pointer" }}
            onClick={() => closeModal()}
          />
        </div>
        <div className="">
          <h1 className="capitalize font-bold">
            {requestType === "edit"
              ? "Edit Transaction"
              : "create new Transaction"}
          </h1>
          <p className="text-sm">Enter the details below</p>
        </div>
        <div className="flex justify-between">
          <InputText
            label={"Amount"}
            placeholder={"Enter amount"}
            value={transactionDetail.amount}
            handleChange={(e) =>
              setTransactionDetail({
                ...transactionDetail,
                amount: e.target.value,
              })
            }
          />
          <InputText
            label={"Quantity"}
            placeholder={"Enter quantity"}
            value={transactionDetail.quantity}
            handleChange={(e) =>
              setTransactionDetail({
                ...transactionDetail,
                quantity: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full">
          <InputText
            label={"Price"}
            placeholder={"Enter price"}
            value={transactionDetail.price}
            handleChange={(e) =>
              setTransactionDetail({
                ...transactionDetail,
                price: e.target.value,
              })
            }
          />
        </div>

        <div className="flex justify-between w-full">
          <InputSelect2
            label={"Collector"}
            placeholder="Select collector"
            options={collectorList}
            handleChange={(e) =>
              setTransactionDetail({
                ...transactionDetail,
                collectorId: e.target.value,
              })
            }
          />
          <InputSelect2
            label={"Aggregator"}
            placeholder="Select aggregator"
            options={aggregatorList}
            handleChange={(e) =>
              setTransactionDetail({
                ...transactionDetail,
                aggregatorId: e.target.value,
              })
            }
          />
        </div>

        <div className="flex justify-between w-full">
          <InputSelect2
            label={"Type of plastic"}
            placeholder="Select plastic type"
            options={plasticTypeList}
            handleChange={(e) =>
              setTransactionDetail({
                ...transactionDetail,
                typeOfPlasticId: e.target.value,
              })
            }
          />
          <InputSelect2
            label={"Source of plastic"}
            placeholder="Select plastic source"
            options={plasticSourceList}
            handleChange={(e) =>
              setTransactionDetail({
                ...transactionDetail,
                sourceOfPlasticId: e.target.value,
              })
            }
          />
        </div>

        <br />

        <div className="flex gap-2 justify-center">
          <button
            className="mx-auto px-2 w-full h-[40px] font-normal text-xs flex justify-center items-center gap-3 disabled:cursor-not-allowed border border-pfBlack md:w-272"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => createTransaction()}
            className="bg-green-700 text-white flex justify-center items-center h-[40px] w-full gap-2"
          >
            {requestType === "edit"
              ? "Save Changes"
              : loading
              ? "Creating..."
              : "Create Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
};
