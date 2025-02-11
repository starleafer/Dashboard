import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ToggleButton } from "react-aria-components";
import { useTheme } from "@/context/ThemeContext";

const CustomToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton
      className={`
        text-yellow-500
        bg-dark
        border border-dark
        rounded-md
        text-base
        text-center
        m-0
        outline-none
        px-3 py-2
        transition-colors
        data-[pressed]:shadow-inner
        data-[pressed]:bg-neutral-700
        data-[pressed]:border-neutral-500
        data-[selected]:bg-dark
        data-[selected]:border-white
        data-[selected]:text-yellow-500
        data-[selected]:data-[pressed]:bg-primary/90
        data-[selected]:data-[pressed]:border-primary/90
        data-[focus-visible]:outline-2
        data-[focus-visible]:outline-blue-500
        data-[focus-visible]:outline-offset-2
      `}
      isSelected={theme === 'dark'}
      onChange={toggleTheme}
    >
      {theme === 'dark' ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </ToggleButton>
  );
};

export default CustomToggleButton;
