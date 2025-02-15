import React, { useState } from "react";
import CustomButton from "../atoms/CustomButton";
import NewsCategory from "../atoms/NewsCategory";
import { NEWS_CATEGORIES } from "@/constants/newsCategories";

interface CustomDisclosureProps {
  onPress: () => void;
}

const CustomDisclosure = ({ onPress }: CustomDisclosureProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePress = () => {
    setIsOpen(!isOpen);
    onPress();
  };

  return (
    <div>
      <CustomButton
        variant="primary"
        size="large"
        label="News"
        onPress={handlePress}
      >
        <svg
          viewBox="0 0 24 24"
          className={`w-4 h-4 transform transition-all duration-100 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <path
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
            className="stroke-current stroke-2"
            fill="none"
          />
        </svg>
      </CustomButton>
      {isOpen && (
        <ul className="pl-1 mt-2 space-y-2">
          {NEWS_CATEGORIES.map((category) => (
            <NewsCategory
              key={category.path}
              label={category.label}
              path={category.path}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDisclosure;
