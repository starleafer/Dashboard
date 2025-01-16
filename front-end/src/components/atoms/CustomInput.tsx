import React from "react";

type CustomInputProps = {
  value: string;
  hasWidth?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
};

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  hasWidth,
  placeholder,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`border rounded-md h-10 bg-transparent p-2 
        w-full md:max-w-xs`}
    />
  );
};

export default CustomInput;
