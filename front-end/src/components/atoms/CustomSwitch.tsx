import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Switch } from "react-aria-components";
import { motion as m } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const CustomSwitch = () => {
  const [isSelected, setIsSelected] = useState(false);
  const { setTheme, theme } = useTheme();

  const raysVariants = {
    hidden: {
      strokeOpacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      strokeOpacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rayVariant = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      scale: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  };

  const shineVariant = {
    hidden: {
      opacity: 0,
      scale: 2,
      strokeDasharray: "20, 1000",
      strokeDashoffset: 0,
      filter: "blur(0px)",
    },
    visible: {
      opacity: [0, 1, 0],
      strokeDashoffset: [0, -50, -100],
      filter: ["blur(2px)", "blur(2px)", "blur(0px)"],
      transition: {
        duration: 0.75,
        ease: "linear",
      },
    },
  };

  const sunPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z";
  const moonPath =
    "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z";

  return (
    <Switch
      isSelected={isSelected}
      onChange={() => {
        setIsSelected(!isSelected);
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className={`
        flex items-center gap-2 text-lg cursor-pointer
        dark:border-dark-border dark:text-dark-text
        border-light-border text-light-text
      `}
    >
      <div
        className={`
            w-8 h-[1.143rem] 
            border
            
             
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
          
            transition-all duration-200
            ${isSelected ? "bg-dark translate-x-full" : "bg-white"}
            data-[pressed]:bg-gray-400
          `}
        />
      </div>
      <span className={`w-4 ${isSelected ? "text-dark" : "text-white"}`}>
        <m.svg
          strokeWidth="4"
          strokeLinecap="round"
          width={100}
          height={100}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
        >
          <m.path
            variants={shineVariant}
            d={moonPath}
            className={"absolute top-0 left-0 stroke-blue-100 "}
            initial="hidden"
            animate={theme === "dark" ? "visible" : "hidden"}
          />

          <m.g
            variants={raysVariants}
            initial="hidden"
            animate={theme === "light" ? "visible" : "hidden"}
            className="stroke-6 stroke-yellow-600 "
            style={{ strokeLinecap: "round" }}
          >
            <m.path
              className="origin-center"
              variants={rayVariant}
              d="M50 2V11"
            />
            <m.path variants={rayVariant} d="M85 15L78 22" />
            <m.path variants={rayVariant} d="M98 50H89" />
            <m.path variants={rayVariant} d="M85 85L78 78" />
            <m.path variants={rayVariant} d="M50 98V89" />
            <m.path variants={rayVariant} d="M23 78L16 84" />
            <m.path variants={rayVariant} d="M11 50H2" />
            <m.path variants={rayVariant} d="M23 23L16 16" />
          </m.g>

          <m.path
            d={sunPath}
            fill="transparent"
            transition={{ duration: 1, type: "spring" }}
            initial={{ fillOpacity: 0, strokeOpacity: 0 }}
            animate={
              theme === "dark"
                ? {
                    d: moonPath,
                    rotate: -360,
                    scale: 2,
                    stroke: "var(--color-blue-400)",
                    fill: "var(--color-blue-400)",
                    fillOpacity: 0.35,
                    strokeOpacity: 1,
                    transition: { delay: 0.1 },
                  }
                : {
                    d: sunPath,
                    rotate: 0,
                    stroke: "var(--color-yellow-600)",
                    fill: "var(--color-yellow-600)",
                    fillOpacity: 0.35,
                    strokeOpacity: 1,
                  }
            }
          />
        </m.svg>
      </span>
    </Switch>
  );
};

export default CustomSwitch;
