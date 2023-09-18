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
import { CiSearch } from "react-icons/ci";
import { instance } from "../Api/axios";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";

const Main = ({ setProducts }) => {
  // side active
  const [saturnActive, setSaturnActive] = useState(true);
  const [mediaActive, setMediaActive] = useState(false);
  const [ottoActive, setOttoActive] = useState(false);

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

  loading?document.body.style.overflow='hidden': document.body.style.overflow=''

  const removeItem = (item) => {
    selection.filter((val) => item != val);
  };

  useEffect(() => {
    // const data = ["EMSA" ]
    const params = {
      brands: data,
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
  }, [data, tefal, emsa]);

  const handleTefal = () => {
    if (!tefal) {
      setData((prev) => [...prev, "Tefal"]);
    } else {
      if (emsa) {
        setData(["EMSA"]);
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
      } else {
        setData([]);
      }
    }
    setEmsa((value) => !value);
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
      <div
        className="w-[19%] h-screen fixed top-0 left-0 p-10"
        style={{
          background:
            "linear-gradient(180deg,rgb(2,25,59) 0%,rgb(5,37,69) 30%,rgb(14,68,116) 66%,rgb(11,108,176)",
        }}
      >
        <p className="text-white font-medium text-2xl">Logo</p>
        <label className="bg-[rgb(2,25,59)] flex items-center gap-3 p-[7px] rounded-[49px] mt-5 border">
          <CiSearch size={30} className="text-white" />
          <input
            placeholder="Search here"
            className="border-none outline-none bg-transparent text-white"
          />
        </label>
        <div>
          <p className="text-white  text-base font-medium mt-8 mb-3">
            Main Menu
          </p>
          <div>
            <button
              onClick={() => {
                return (
                  setSaturnActive(true),
                  setMediaActive(false),
                  setOttoActive(false)
                );
              }}
              className={`bg-transparent ${
                saturnActive && "bg-white text-[#000] font-medium"
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
                return (
                  setSaturnActive(false),
                  setMediaActive(true),
                  setOttoActive(false)
                );
              }}
              className={`bg-transparent ${
                mediaActive ? "bg-white text-black font-medium" : ""
              } hover:bg-white hover:font-medium hover:text-[#000] p-4 text-white w-full text-start rounded-[49px] my-2 font-normal flex items-start gap-1`}
            >
              {" "}
              <img src={media} className="mt-[-10px] mr-2" />{" "}
              <span className={`${mediaActive && "text-black font-medium"}`}>
                Media Marketing
              </span>
            </button>
            <button
              onClick={() => {
                return (
                  setSaturnActive(false),
                  setMediaActive(false),
                  setOttoActive(true)
                );
              }}
              className={`bg-transparent ${
                ottoActive ? "bg-white text-black font-medium" : ""
              } hover:bg-white hover:font-medium hover:text-[#000] p-4 text-white w-full text-start rounded-[49px]  font-normal flex items-start gap-1`}
            >
              {" "}
              <img src={otto} className="pr-3" />{" "}
              <span className={`${ottoActive && "text-black font-medium"}`}>
                OTTO
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* main part */}
      <div
        className={`w-[81%] h-screen bg-[#F8F8F8] p-10 flex items-start gap-[30px] `}
      >
        <div className={`${data.length ? "" : "w-full"}`}>
          <p className="text-[#000] text-3xl font-medium">Brands</p>
          <div
            className={`grid ${
              data.length ? "grid-cols-1" : "grid-cols-4"
            } flex-wrap gap-4 mt-[28px]`}
          >
            {/* tefal */}
            <div
              className={`bg-white ${
                tefal ? "border-[#000]" : "border-[#F1F1F1]"
              } border  rounded-2xl px-2 py-5   flex  items-center  justify-between cursor-pointer`}
              onClick={handleTefal}
            >
              <div className="flex items-center gap-1">
                <img src={tefalImg} className="h-[50xpx] w-[50px]" />
                <p className="text-[#000] font-medium text-2xl">TEFAL</p>
              </div>

              <div
                className={`${
                  tefal ? "bg-[#000] text-white" : "bg-transparent"
                } hover:bg-[#000] hover:text-white cursor-pointer transition-all duration-500 border border-[#000] rounded-full p-[10px] `}
              >
                {tefal ? <BsArrowLeft size="15" /> : <BsArrowRight size="15" />}
              </div>
            </div>

            {/* Rowenta */}
            <div
              className={`bg-white border ${
                rowenta ? "border-[#000]" : "border-[#F1F1F1]"
              }  rounded-2xl px-2 py-5  inline-flex  items-center justify-between cursor-pointer`}
              onClick={() => {
                return (
                  setData((prev) => [...prev, "Rowenta"]),
                  setRowenta((prev) => !prev)
                );
              }}
            >
              <div className="flex items-center gap-1">
                <img src={rowentaImg} className="h-[50xpx] w-[50px]" />
                <p className="text-[#000] font-medium text-2xl ">ROWENTA</p>
              </div>

              <div
                className={`${
                  rowenta ? "bg-[#000] text-white" : "bg-transparent"
                } hover:bg-[#000]  hover:text-white cursor-pointer transition-all duration-500 border border-[#000] rounded-full p-[10px] `}
              >
                {rowenta ? (
                  <BsArrowLeft size="15" />
                ) : (
                  <BsArrowRight size="15" />
                )}
              </div>
            </div>

            {/* Emsa */}
            <div
              className={`bg-white border ${
                emsa ? "border-[#000]" : "border-[#F1F1F1]"
              } rounded-2xl px-2 py-5  inline-flex  items-center justify-between cursor-pointer`}
              onClick={handlerEmsa}
            >
              <div className="flex items-center gap-1">
                <img src={emsaImg} className="h-[40px] w-[40px]" />
                <p className="text-[#000] font-medium text-2xl">EMSA</p>
              </div>
              <div
                className={`${
                  emsa ? "bg-[#000] text-white" : "bg-transparent"
                }  hover:bg-[#000] hover:text-white cursor-pointer transition-all duration-500 border border-[#000] rounded-full p-[10px]`}
              >
                {emsa ? <BsArrowLeft size="15" /> : <BsArrowRight size="15" />}
              </div>
            </div>

            {/* Krups */}
            <div
              className={` bg-white border ${
                krups ? "border-[#000]" : "border-[#F1F1F1]"
              } rounded-2xl px-2 py-5 inline-flex  items-center justify-between cursor-pointer`}
              onClick={() => {
                return (
                  setData((prev) => [...prev, "Krups"]),
                  setKrups((prev) => !prev)
                );
              }}
            >
              <div className="flex items-center gap-1">
                <img src={krupsImg} className="h-[50px] w-[50px]" />
                <p className="text-[#000] font-medium text-2xl">KRUPS</p>
              </div>
              <div
                className={`${
                  krups ? "bg-[#000] text-white" : "bg-transparent"
                } hover:bg-[#000] hover:text-white cursor-pointer transition-all duration-500 border border-[#000] rounded-full p-[10px]`}
              >
                {krups ? <BsArrowLeft size="15" /> : <BsArrowRight size="15" />}
              </div>
            </div>
          </div>
        </div>

        {/* Lists */}
        {data.length != 0 && (
          <div className="grow">
            <p className="text-[#000] text-3xl mb-[28px] font-medium">Products</p>
            
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
                            isSelected
                              ? "bg-[#ddd] "
                              : "bg-transparent "
                          } rounded-lg`}
                        >
                          {data?.category}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <button
                  className={`text-white ${
                    loading && "cursor-wait bg-[#807eff]"
                  } font-medium text-xl py-[10px] px-[73px] rounded-[10px] border-none transition-all duration-300 bg-[#4340ff] mt-10 block ml-auto `}
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
        { loading && <Loading/> }
      </div>
    </div>
  );
};

export default Main;
