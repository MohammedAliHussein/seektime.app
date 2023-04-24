import { motion, circOut } from "framer-motion";

import Algorithms from "./config/algorithms";
import Direction from "./config/direction";
import Cylinders from "./config/cylinders";
import Requests from "./config/requests";
import Confirm from "./config/confirm";
import Background from "./config/background";
import Close from "./config/close";
import Title from "./config/title";
import { useState } from "react";


const Config = ({ setConfigOpen, configOpen, algorithm, setAlgorithm, direction, setDirection, setCylinders, setDiskRequests }) => {
  const handleClick = () => {
    setConfigOpen(!configOpen);
  }

  return (
    <motion.div 
      className="absolute w-screen h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Background handleClick={handleClick}/>
      <div className="absolute z-10 flex flex-col gap-3 items-center justify-start outline outline-1 outline-[rgba(255,255,255,0.1)] w-[18rem] h-fit p-5 bg-[rgb(8,8,8)]">
        <Close handleClick={handleClick} />
        <Title />
        <Algorithms algorithm={algorithm} setAlgorithm={setAlgorithm}/>
        <Direction direction={direction} algorithm={algorithm} setDirection={setDirection}/>
        <Cylinders setCylinders={setCylinders}/>
        <Requests setDiskRequests={setDiskRequests}/>
        <Confirm />
      </div>
    </motion.div>
  );
}

export default Config;