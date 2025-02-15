import React from "react";
import { useRouter } from "next/navigation";

interface CategoryCardProps {
  title: string;
  imagePath: string;
  size?: "large" | "normal";
  abstract: string;
}

const CategoryCard = ({
  title,
  imagePath,
  size = "normal",
  abstract,
}: CategoryCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/news/${title.toLowerCase()}`)}
      className={`
        relative flex flex-col items-center justify-center rounded-md cursor-pointer
        hover:scale-[1.02] transition-transform duration-200
        ${size === "large" ? "col-span-2" : ""}
      `}
    >
      <div className="relative w-full">
        <img
          src={imagePath}
          alt={title}
          className={`
            object-cover rounded-md w-full
            ${size === "large" ? "h-[300px]" : "h-[250px]"}
          `}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent rounded-md" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl font-medium text-white mb-2">
            {title}
          </h2>
          <p className="text-sm text-gray-200">
            {abstract}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
