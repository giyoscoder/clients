import React from "react";
import { NewtonsCradle } from "@uiball/loaders";

import './Loading.css'

const Loading = () => {
  return (
    <div className="bg-white/60 h-[1000%] w-full flex justify-center items-center absolute   top-0 left-0">
      <NewtonsCradle size={50} speed={1.4} color="blue" />
    </div>
  );
};

export default Loading;
