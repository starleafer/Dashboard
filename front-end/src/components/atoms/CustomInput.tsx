import React from "react";

type CustomInputProps = {
  value: string;
  hasWidth?: boolean;
  onChange: (value: string) => void;
};

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  hasWidth,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      className={`border rounded-md h-10 bg-transparent p-2 
        w-full md:max-w-xs`}
    />
  );
};

export default CustomInput;
