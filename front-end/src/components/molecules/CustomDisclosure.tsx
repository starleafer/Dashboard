import React, { useState } from "react";
import CustomButton from "../atoms/CustomButton";
import { useRouter } from "next/navigation";

const CustomDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
      <CustomButton
        variant="primary"
        size="large"
        label="News"
        onPress={() => setIsOpen(!isOpen)}
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
          <li>
            <CustomButton
              variant="text"
              label="General"
              size="small"
              onPress={() => router.push("/news/general")}
            />
          </li>
          <li>
            <CustomButton
              variant="text"
              label="World"
              size="small"
              onPress={() => router.push("/news/world")}
            />
          </li>
          <li>
            <CustomButton
              variant="text"
              label="Business"
              size="small"
              onPress={() => router.push("/news/business")}
            />
          </li>
          <li>
            <CustomButton
              variant="text"
              label="Technology"
              size="small"
              onPress={() => router.push("/news/technology")}
            />
          </li>
          <li>
            <CustomButton
              variant="text"
              label="Sports"
              size="small"
              onPress={() => router.push("/news/sports")}
            />
          </li>
          <li>
            <CustomButton
              variant="text"
              label="Science"
              size="small"
              onPress={() => router.push("/news/science")}
            />
          </li>
        </ul>
      )}
    </div>
  );
};

export default CustomDisclosure;
