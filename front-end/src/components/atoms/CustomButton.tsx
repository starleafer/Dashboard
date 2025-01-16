import React from "react";
import { Button, PressEvent } from "react-aria-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faPlus, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

type CustomButtonProps = {
  label?: string;
  icon?: "plus" | "done" | "edit" | "delete" | "save" | "close";
  variant?: "primary" | "secondary" | "text";
  theme?: "primary" | "secondary" | "warning" | "danger";
  className?: "primary" | "secondary" | "warning" | "danger" | undefined;
  size?: "small" | "large" | "undefined";
  onPress?: (e: PressEvent) => void;
};

const CustomButton = ({
  label,
  variant,
  className,
  theme,
  size,
  icon,
  onPress,
}: CustomButtonProps) => {
  let bgColor = "";
  let borderColor = "";
  let textColor = "";
  let sizeClass = "";
  let variantClass = "";
  let hoverClass = "";
  let activeClass = "";
  let iconElement = null;

  switch (className) {
    case "primary":
      hoverClass = "hover:border-primary hover:text-primary";
      activeClass = "active:border-primaryDark active:text-primaryDark";
      break;
    case "warning":
      hoverClass = "hover:border-warning hover:text-warning";
      activeClass = "active:border-warningDark active:text-warningDark";
      break;
    case "danger":
      hoverClass = "hover:border-danger hover:text-danger";
      activeClass = "active:border-dangerDark active:text-dangerDark";
      break;
    default:
      bgColor = "bg-white";
      borderColor = "border border-white";
      textColor = "text-white";
      hoverClass = "hover:bg-primary hover:text-white";
      break;
  }

  switch (variant) {
    case "primary":
      variantClass = `${bgColor} ${textColor}`;
      break;
    case "secondary":
      variantClass = `border ${borderColor} ${textColor}`;
      break;
    case "text":
      variantClass = `${textColor}`;
      break;
    default:
      return <Button>{label}</Button>;
  }

  switch (size) {
    case "small":
      sizeClass = "h-7 p-2 px-2";
      break;
    case "large":
      sizeClass = "h-12 py-3 px-3";
      break;
    default:
      sizeClass = "p-2";
      break;
  }

  const iconClass = `w-3 h-3`;

  switch (icon) {
    case "plus":
      iconElement = <FontAwesomeIcon icon={faPlus} className={iconClass} />;
      break;
    case "done":
      iconElement = <FontAwesomeIcon icon={faCheck} className={iconClass} />;
      break;
    case "edit":
      iconElement = <FontAwesomeIcon icon={faEdit} className={iconClass} />;
      break;
    case "delete":
      iconElement = <FontAwesomeIcon icon={faTrash} className={iconClass} />;
      break;
    case "save":
      iconElement = <FontAwesomeIcon icon={faSave} className={iconClass} />;
      break;
    case "close":
      iconElement = <FontAwesomeIcon icon={faTimes} className={iconClass} />;
      break;
    default:
      break;
  }

  return (
    <Button
      className={`
        ${variantClass}
        ${hoverClass}
        ${activeClass}
        ${sizeClass}
        flex
        items-center
        justify-center 
        rounded-lg 
        outline-none  
        gap-2   
      `}
      onPress={onPress}
    >
      {iconElement}
      {label}
    </Button>
  );
};

export default CustomButton;