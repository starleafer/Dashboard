import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

type CustomInputProps = {
  value: string;
  hasWidth?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onClear?: () => void;
  onSearch?: (value: string) => void;
  children?: React.ReactNode;
};

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  hasWidth,
  placeholder,
  onChange,
  onKeyDown,
  onClear,
  onSearch,
  children,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (onSearch) {
      onSearch(newValue);
    }
  };

  return (
    <div className="relative w-full md:max-w-xs">
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="border rounded-md h-10 bg-transparent p-2 w-full pr-16 text-white"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
        {value && onClear && (
          <button
            onClick={onClear}
            className="text-white hover:text-gray-300"
          >
            <FontAwesomeIcon icon={faClose} className="w-4 h-4" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default CustomInput;
