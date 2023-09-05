import React from "react";
import { saturn, tefal } from "./assets";
import { BsArrowLeft } from "react-icons/bs";
const App = () => {
  return (
    <div className="w-full flex justify-end  ">
      <div
        className="w-[19%] h-screen fixed top-0 left-0 p-10"
        style={{
          background:
            "linear-gradient(180deg,rgb(2,25,59) 0%,rgb(5,37,69) 30%,rgb(14,68,116) 66%,rgb(11,108,176)",
        }}
      >
        <p className="text-white font-medium text-2xl">Logo</p>
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
              <img src={saturn} /> Media Marketing
            </button>
            <button className="bg-transparent hover:bg-white hover:font-medium hover:text-[#000] p-4 text-white w-full text-start rounded-[49px]  font-normal flex items-start gap-1">
              {" "}
              <img src={saturn} /> OTTO
            </button>
          </div>
        </div>
      </div>
      <div className="w-[81%] h-screen bg-[#F8F8F8] p-10">
        <div >
          <p className="text-[#000] text-3xl font-medium">Brands!</p>
          <div className="flex flex-col gap-4 mt-[28px]">
            {/* tefal */}
            <div className="bg-white border border-[F1F1F1] rounded-2xl p-5  flex  items-center gap-5">
              <img src={tefal} />
              <p className="text-[#000] font-medium text-3xl">TEFAL <span className="block text-[#828282] text-base font-medium">Total product : 15+</span></p>

              <div className="bg-transparent hover:bg-[#000] hover:text-white cursor-pointer transition-all duration-500 border border-[#000] rounded-full p-[10px] ml-[27px]">
                <BsArrowLeft size="20" />
              </div>
            </div>

            {/* Rowenta */}
            <div className="bg-white border border-[F1F1F1] rounded-2xl p-5 inline-flex  items-center gap-5">
              <img src={tefal} />
              <p className="text-[#000] font-medium text-3xl">ROWENTA <span className="block text-[#828282] text-base font-medium">Total product : 15+</span></p>

              <div className="bg-transparent hover:bg-[#000] hover:text-white cursor-pointer transition-all duration-500 border border-[#000] rounded-full p-[10px] ml-[27px]">
                <BsArrowLeft size="20" />
              </div>
            </div>
            {/* Emsa */}
            <div className="bg-white border border-[F1F1F1] rounded-2xl p-5 inline-flex  items-center gap-5">
              <img src={tefal} />
              <p className="text-[#000] font-medium text-3xl">EMSA <span className="block text-[#828282] text-base font-medium">Total product : 15+</span></p>

              <div className="bg-transparent hover:bg-[#000] hover:text-white cursor-pointer transition-all duration-500 border border-[#000] rounded-full p-[10px] ml-[27px]">
                <BsArrowLeft size="20" />
              </div>
            </div>
            {/* Krups */}
            <div className="bg-white border border-[F1F1F1] rounded-2xl p-5 inline-flex  items-center gap-5">
              <img src={tefal} />
              <p className="text-[#000] font-medium text-3xl">KRUPS <span className="block text-[#828282] text-base font-medium">Total product : 15+</span></p>

              <div className="bg-transparent hover:bg-[#000] hover:text-white cursor-pointer transition-all duration-500 border border-[#000] rounded-full p-[10px] ml-[27px]">
                <BsArrowLeft size="20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
