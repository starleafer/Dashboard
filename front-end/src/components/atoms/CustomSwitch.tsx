import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Switch } from "react-aria-components";

const CustomSwitch = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Switch
      isSelected={isSelected}
      onChange={setIsSelected}
      className="flex items-center gap-2 text-lg cursor-pointer w-16 ml-7"
    >
      <div
        className={`
            w-8 h-[1.143rem] 
            border
            
            rounded-full 
            transition-all duration-200
            ${isSelected ? "bg-white border-dark" : "bg-dark border-white"}
            data-[pressed]:border-gray-400
            data-[focus-visible]:outline-2
            data-[focus-visible]:outline-offset-2
            relative
            flex items-center
        `}
      >
        <div
          className={`
            absolute 
            w-3.5 h-3.5 
            left-0.5
            rounded-full 
            transition-all duration-200
            ${isSelected ? "bg-dark translate-x-full" : "bg-white"}
            data-[pressed]:bg-gray-400
          `}
        />
      </div>
      <span className={`w-4 ${isSelected ? "text-dark" : "text-white"}`}>
        <FontAwesomeIcon icon={isSelected ? faMoon : faSun} />
      </span>
    </Switch>
  );
};

export default CustomSwitch;
