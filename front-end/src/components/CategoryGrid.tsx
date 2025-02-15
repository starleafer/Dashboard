"use client";
import React from "react";
import CategoryCard from "./atoms/CategoryCard";
import { CATEGORY_CARDS } from "@/constants/categoryCards";

interface CategoryGridProps {
  data?: ReadonlyArray<{
    readonly title: string;
    readonly imagePath: string;
    readonly abstract: string;
    readonly size?: "large" | "normal";
  }>;
}

const CategoryGrid = ({ data = CATEGORY_CARDS }: CategoryGridProps) => {
  return (
    <div className="flex flex-col items-center w-[90%] p-10 mt-5 ml-5 rounded-md bg-light-component dark:bg-dark-component">
      <div className="w-full max-w-[1600px]">
        <h1 className="text-2xl font-bold text-primary">News Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-5">
          {data.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              abstract={category.abstract}
              imagePath={category.imagePath}
              size={category.size}
              className={`${category.size === "large" ? "md:col-span-2" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
