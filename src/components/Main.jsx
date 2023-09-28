import React, { useState, useEffect } from "react";
import {
  saturn,
  tefalImg,
  otto,
  krupsImg,
  media,
  rowentaImg,
  emsaImg,
} from "../assets";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { BiSolidDownArrow } from "react-icons/bi";
import { instance } from "../Api/axios";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";

const Main = ({ setProducts }) => {
  // side active
  const [saturnActive, setSaturnActive] = useState(true);
  const [mediaActive, setMediaActive] = useState(true);

  const [tefal, setTefal] = useState(false);
  const [rowenta, setRowenta] = useState(false);
  const [krups, setKrups] = useState(false);
  const [emsa, setEmsa] = useState(false);
  const [list, setList] = useState(-1);
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [selection, setSelection] = useState([]);
  const [number, setNumber] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);


  // SelectAll
  const [selectBrandAll, setSelectBrandAll] = useState(false);
  const [selectCategoryAll, setSelectCategoryAll] = useState(false)

  loading
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "");

  const removeItem = (item) => {
    selection.filter((val) => item != val);
  };

  useEffect(() => {
    // const data = ["EMSA" ]
    const params = {
      brands: selectCategoryAll ? result : data,
    };

    const queryString = Object.keys(params)
      .map((key) => {
        const values = Array.isArray(params[key]) ? params[key] : [params[key]];
        return values
          .map(
            (value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");
      })
      .join("&");

    const url = `/get_categories/?${queryString}`;
    instance.get(url).then((data) => setResult(data?.data));
  }, [data, tefal, emsa, rowenta, krups]);

  const handleTefal = () => {
    if (!tefal) {
      setData((prev) => [...prev, "Tefal"]);
    } else {
      if (emsa) {
        setData(["EMSA"]);
      } else if (rowenta) {
        setData(["Rowenta"]);
      } else if (krups) {
        setData(["Krups"]);
      } else {
        setData([]);
      }
    }

    setTefal((value) => !value);
  };

  const handlerEmsa = () => {
    if (!emsa) {
      setData((prev) => [...prev, "EMSA"]);
    } else {
      if (tefal) {
        setData(["Tefal"]);
      } else if (rowenta) {
        setData(["Rowenta"]);
      } else if (krups) {
        setData(["Krups"]);
      } else {
        setData([]);
      }
    }
    setEmsa((value) => !value);
  };

  const handlerRowenta = () => {
    if (!rowenta) {
      setData((prev) => [...prev, "Rowenta"]);
    } else {
      if (tefal) {
        setData(["Tefal"]);
      } else if (emsa) {
        setData(["EMSA"]);
      } else if (krups) {
        setData(["Krups"]);
      } else {
        setData([]);
      }
    }
    setRowenta((value) => !value);
  };

  const handlerKrups = () => {
    if (!krups) {
      setData((prev) => [...prev, "Krups"]);
    } else {
      if (tefal) {
        setData(["Tefal"]);
      } else if (emsa) {
        setData(["EMSA"]);
      } else if (rowenta) {
        setData(["Rowenta"]);
      } else {
        setData([]);
      }
    }
    setKrups((value) => !value);
  };

  const submitHandler = () => {
    setLoading(true);
    const params = {
      categories: selectedItems,
    };

    const queryString = Object.keys(params)
      .map((key) => {
        const values = Array.isArray(params[key]) ? params[key] : [params[key]];
        return values
          .map(
            (value) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");
      })
      .join("&");

    const url = `/search?${queryString}`;
    instance
      .get(url)
      .then((data) => setNumber(data?.data))
      .finally(() => setLoading(false));
  };

  setProducts(number?.products);

  const toggleElement = (categoryItem) => {
    if (selectedItems.includes(categoryItem)) {
      setSelectedItems(selectedItems.filter((item) => item != categoryItem));
    } else {
      setSelectedItems([...selectedItems, categoryItem]);
    }
  };

  return (
    <div className="w-full flex justify-end">
      {/* side bar */}
      <div className="w-[19%] h-screen  shadow-xl fixed top-0 left-0 p-10 sidebar">
        <div>
          <p className="text-black  text-xl  font-medium mt-8 mb-5">Retailer</p>
          <div>
            <button
              onClick={() => {
                return setSaturnActive(true), setMediaActive(false);
              }}
              className={`bg-transparent shadow-md text-[#000] ${
                saturnActive && "bg-white  font-medium"
              } hover:bg-white hover:font-medium hover:text-[#000] p-4 text-white w-full text-start rounded-[49px]  font-normal flex items-start gap-1`}
            >
              {" "}
              <img src={saturn} />{" "}
              <span className={`${saturnActive && "text-black font-semibold"}`}>
                Saturn
              </span>
            </button>
            <button
              onClick={() => {
                return setSaturnActive(false), setMediaActive(true);
              }}
              className={`bg-transparent text-black  shadow-md ${
                mediaActive ? "bg-white font-medium" : ""
              } hover:bg-white hover:font-medium hover:text-[#000] p-4 text-white w-full text-start rounded-[49px] my-2 font-normal flex items-start gap-1`}
            >
              {" "}
              <img src={media} className="mt-[-10px] mr-2" />{" "}
              <span className={`${mediaActive && "text-black font-medium"}`}>
                MediaMarkt
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------||------------------------------------------ */}
      {/* main part */}
      <div
        className={`w-[81%] h-screen bg-[#F8F8F8] p-10 flex items-start gap-[30px] `}
      >
        <div className={`${data.length ? "" : "w-full"}`}>
          <div className="flex items-center gap-5 ">
            <div
              className="flex items-center gap-1 border cursor-pointer border-[#999] py-2 px-1 rounded-sm"
              onClick={() => (
                setSelectBrandAll((prev) => !prev),
                handleTefal(),
                handlerEmsa(),
                handlerKrups(),
                handlerRowenta()
              )}
            >
              <input
                type="checkbox"
                className="text-2xl h-4 w-4 cursor-pointer"
                checked={selectBrandAll}
              />
              <BiSolidDownArrow size="10" className="text-[#777]" />
            </div>
            <p className="text-[#000] text-3xl font-medium">Brands</p>
          </div>

          <div
            className={`grid ${
              data.length ? "grid-cols-1" : "grid-cols-4"
            } flex-wrap gap-4 mt-[28px]`}
          >
            {/* tefal */}
            <div
              className={`bg-white shadow-md shadow-[#94bdff] ${
                tefal ? "border-[#000]" : "border-[#F1F1F1]"
              } border  rounded-2xl px-2 py-5   flex  items-center  justify-between cursor-pointer`}
              onClick={handleTefal}
            >
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  className="text-2xl h-4 w-4 mr-1 cursor-pointer"
                  checked={tefal}
                />
                <p className="text-[#000] font-medium text-2xl">TEFAL</p>
              </div>
            </div>

            {/* Rowenta */}
            <div
              className={`bg-white border shadow-md shadow-[#94bdff] ${
                rowenta ? "border-[#000]" : "border-[#F1F1F1]"
              }  rounded-2xl px-2 py-5  inline-flex  items-center justify-between cursor-pointer`}
              onClick={handlerRowenta}
            >
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  className="text-2xl h-4 w-4 mr-1 cursor-pointer"
                  checked={rowenta}
                />

                <p className="text-[#000] font-medium text-2xl ">ROWENTA</p>
              </div>
            </div>

            {/* Emsa */}
            <div
              className={`bg-white border shadow-md shadow-[#94bdff] ${
                emsa ? "border-[#000]" : "border-[#F1F1F1]"
              } rounded-2xl px-2 py-5  inline-flex  items-center justify-between cursor-pointer`}
              onClick={handlerEmsa}
            >
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  className="text-2xl h-4 w-4 mr-1 cursor-pointer"
                  checked={emsa}
                />

                <p className="text-[#000] font-medium text-2xl">EMSA</p>
              </div>
            </div>

            {/* Krups */}
            <div
              className={` bg-white border shadow-md shadow-[#94bdff] ${
                krups ? "border-[#000]" : "border-[#F1F1F1]"
              } rounded-2xl px-2 py-5 inline-flex  items-center justify-between cursor-pointer`}
              onClick={handlerKrups}
            >
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  className="text-2xl h-4 w-4 mr-1 cursor-pointer"
                  checked={krups}
                />
                <p className="text-[#000] font-medium text-2xl">KRUPS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lists */}
        {data.length != 0 && (
          <div className="grow">
            <div className="flex justify-between">
              <p className="text-[#000] text-3xl mb-[28px] font-medium">
                Category
              </p>
              <div
                className="flex items-center gap-1 border cursor-pointer border-[#999] h-[30px] p-2 rounded-sm"
               onClick={()=> (setSelectCategoryAll(prev => !prev))}
              >
                <input
                  type="checkbox"
                  className="text-2xl h-4 w-4 cursor-pointer"
                  checked={selectCategoryAll}
                />
                <BiSolidDownArrow size="10" className="text-[#777]" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white border relative border-[#F1F1F1] rounded-2xl p-5  divide-[white] h-[500px] overflow-y-scroll listData">
                {/* list */}
                <div>
                  {result.map((data, idx) => {
                    const isSelected = selectedItems.includes(data?.category);
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-3 my-3 cursor-pointer ${
                          isSelected && "selected-item"
                        }`}
                        onClick={() => toggleElement(data?.category)}
                      >
                        <p
                          className={`text-base text-[#000] font-normal h-[46px] w-[46px] grid place-items-center ${
                            isSelected ? "bg-[#ddd]" : "bg-transparent"
                          } rounded-lg`}
                        >
                          {idx + 1}
                        </p>
                        <p
                          className={`grow text-[#000] text-base tracking-[0.16px] py-[11px] pl-[11px]  ${
                            isSelected ? "bg-[#ddd] " : "bg-transparent "
                          } rounded-lg`}
                        >
                          {data?.category}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="">
                <button
                  className={`text-white ${
                    loading && "cursor-wait bg-[#807eff]"
                  } font-mediumtext-xl py-[10px] px-[73px] rounded-[10px] border-none transition-all duration-300 bg-[#4340ff] my-8 block ml-auto `}
                  onClick={submitHandler}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Start Parsing"}
                </button>
              </div>

              <div className="flex items-center justify-between bg-white p-5 rounded-[16px] mt-[10px]">
                <p className="text-xl font-normal text-[#000]">Total: </p>
                <NavLink to="/next" className="text-xl font-medium text-[#000]">
                  {number?.count} Articles
                </NavLink>
              </div>
            </div>
          </div>
        )}
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default Main;
