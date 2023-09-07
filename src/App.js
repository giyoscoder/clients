import React, { useState, useEffect } from "react";
import { saturn, tefalImg, otto, krupsImg, media, rowentaImg , emsaImg} from "./assets";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { instance } from "./Api/axios";

const App = () => {
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
    const params = {
      categories: selection,
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
    instance.get(url).then((data) => setNumber(data?.data?.count));

  };



  const handleItemClick = (idx) => {
    setList(idx);
    const selectedItem = result[idx]?.category;
    if (selectedItems.includes(selectedItem)) {
      setSelectedItems(selectedItems.filter((item) => item !== selectedItem));
    } else {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  return (
    <div className="w-full flex justify-end  ">
      {/* side bar */}
      <div
        className="w-[19%] h-screen fixed top-0 left-0 p-10"
        style={{
          background:
            "linear-gradient(180deg,rgb(2,25,59) 0%,rgb(5,37,69) 30%,rgb(14,68,116) 66%,rgb(11,108,176)",
        }}
      >
        <p className="text-white font-medium text-2xl">Logo</p>
        <label className="bg-[rgb(2,25,59)] flex items-center gap-3 p-[14px] rounded-[49px] mt-5 border">
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
            <button className="bg-transparent hover:bg-white hover:font-medium hover:text-[#000] p-4 text-white w-full text-start rounded-[49px]  font-normal flex items-start gap-1">
              {" "}
              <img src={saturn} /> Saturn
            </button>
            <button className="bg-transparent hover:bg-white hover:font-medium hover:text-[#000] p-4 text-white w-full text-start rounded-[49px]  font-normal flex items-start gap-1">
              {" "}
              <img src={media} className="mt-[-10px] mr-2"/> Media Marketing
            </button>
            <button className="bg-transparent hover:bg-white hover:font-medium hover:text-[#000] p-4 text-white w-full text-start rounded-[49px]  font-normal flex items-start gap-1">
              {" "}
              <img src={otto} className="pr-3" /> OTTO
            </button>
          </div>
        </div>
      </div>

      {/* main part */}
      <div
        className={`w-[81%] h-screen bg-[#F8F8F8] p-10 flex items-start gap-[30px]`}
      >
        <div className="">
          <p className="text-[#000] text-3xl font-medium">Brands</p>
          <div
            className={`flex ${data.length ? "flex-col" : ""}  gap-4 mt-[28px]`}
          >
            {/* tefal */}
            <div
              className={`bg-white ${
                tefal ? "border-[#000]" : "border-[F1F1F1]"
              } border  rounded-2xl p-5  flex  items-center  justify-between cursor-pointer`}
              onClick={handleTefal}
            >
              <div className="flex items-center gap-1">
                <img src={tefalImg} className="h-[70xpx] w-[70px]" />
                <p className="text-[#000] font-medium text-3xl">TEFAL</p>
              </div>

              <div
                className={`${
                  tefal ? "bg-[#000] text-white" : "bg-transparent"
                } hover:bg-[#000] hover:text-white cursor-pointer transition-all duration-500 border border-[#000] rounded-full p-[10px] ml-[27px]`}
              >
                {tefal ? <BsArrowLeft size="20" /> : <BsArrowRight size="20" />}
              </div>
            </div>

            {/* Rowenta */}
            <div
              className={`bg-white border ${
                rowenta ? "border-[#000]" : "border-[F1F1F1]"
              }  rounded-2xl p-5 inline-flex  items-center justify-between cursor-pointer`}
              onClick={() => {
                return (
                  setData((prev) => [...prev, "Rowenta"]),
                  setRowenta((prev) => !prev)
                );
              }}
            >
              <div className="flex items-center gap-1">
                <img src={rowentaImg} className="h-[70xpx] w-[70px]" />
                <p className="text-[#000] font-medium text-3xl">ROWENTA</p>
              </div>

              <div
                className={`${
                  rowenta ? "bg-[#000] text-white" : "bg-transparent"
                } hover:bg-[#000]  hover:text-white cursor-pointer transition-all duration-500 border border-[#000] rounded-full p-[10px] ml-[27px]`}
              >
                {rowenta ? (
                  <BsArrowLeft size="20" />
                ) : (
                  <BsArrowRight size="20" />
                )}
              </div>
            </div>
            {/* Emsa */}
            <div
              className={`bg-white border ${
                emsa ? "border-[#000]" : "border-[#F1F1F1]"
              } rounded-2xl p-5 inline-flex  items-center justify-between cursor-pointer`}
              onClick={handlerEmsa}
            >
              <div className="flex items-center gap-1">
                <img src={emsaImg} className="h-[50px] w-[50px]" />
                <p className="text-[#000] font-medium text-3xl">EMSA</p>
              </div>
              <div
                className={`${
                  emsa ? "bg-[#000] text-white" : "bg-transparent"
                }  hover:bg-[#000] hover:text-white cursor-pointer transition-all duration-500 border border-[#000] rounded-full p-[10px] ml-[27px]`}
              >
                {emsa ? <BsArrowLeft size="20" /> : <BsArrowRight size="20" />}
              </div>
            </div>

            {/* Krups */}
            <div
              className={` bg-transparent border ${
                krups ? "border-[#000]" : "border-[F1F1F1]"
              } rounded-2xl p-5 inline-flex  items-center justify-between cursor-pointer`}
              onClick={() => {
                return (
                  setData((prev) => [...prev, "Krups"]),
                  setKrups((prev) => !prev)
                );
              }}
            >
              <div className="flex items-center gap-1">
                <img src={krupsImg} className="h-[70xpx] w-[70px]" />
                <p className="text-[#000] font-medium text-3xl">KRUPS</p>
              </div>
              <div
                className={`${
                  krups ? "bg-[#000] text-white" : "bg-transparent"
                } hover:bg-[#000] hover:text-white cursor-pointer transition-all duration-500 border border-[#000] rounded-full p-[10px] ml-[27px]`}
              >
                {krups ? <BsArrowLeft size="20" /> : <BsArrowRight size="20" />}
              </div>
            </div>
          </div>
        </div>

        {/* Lists */}
        {data.length != 0 && (
          <div className="grow ">
            <p className="text-[#000] text-3xl font-medium">Products</p>
            <div className="bg-white border mt-[28px] border-[#F1F1F1] rounded-2xl p-5 divide-y-[12px] divide-[white] h-[500px] overflow-y-scroll listData">
              {/* list */}
              <div>
                {result.map((data, idx) => {
                  const isSelected = selectedItems.includes(data?.category);
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 cursor-pointer ${
                        isSelected ? "selected-item" : ""
                      }`}
                      onClick={() =>{return  handleItemClick(idx), setData(prev => [...prev, data?.category])}}
                    >
                      <p
                        className={`text-base text-[#000] font-normal h-[46px] w-[46px] grid place-items-center ${
                          isSelected ? "bg-[#F8F8F8]" : "bg-transparent"
                        } rounded-lg`}
                      >
                        {idx + 1}
                      </p>
                      <p
                        className={`grow text-[#000] text-base tracking-[0.16px] py-[11px] pl-[11px] border-r-4 border-transparent ${
                          isSelected
                            ? "bg-[#F8F8F8] border-blue-900"
                            : "bg-transparent"
                        } rounded-lg`}
                      >
                        {data?.category}
                      </p>
                    </div>
                  );
                })}
              </div>
              <button
                className="text-white font-medium text-xl py-[10px] px-[73px] rounded-[10px] border-none transition-all duration-300 bg-[#7C7AF3] mt-10 block ml-auto hover:bg-[#4340ff]"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
            <div className="flex items-center justify-between bg-white p-5 rounded-[16px] mt-[10px]">
              <p className="text-xl font-normal text-[#000]">Total: </p>
              <p className="text-xl font-medium text-[#000]">
                {number} Articles
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
