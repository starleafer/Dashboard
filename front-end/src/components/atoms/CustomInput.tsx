import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [value]);

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
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`
          border h-10 bg-transparent p-2 w-full pr-16
          border-primary dark:text-dark-text
           text-light-text rounded-md
        `}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
        {value && onClear && (
          <button
            onClick={onClear}
            className="dark:text-white text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
