"use client";
import React from "react";
import CategoryCard from "./atoms/CategoryCard";
import { CATEGORY_CARDS } from "@/constants/categoryCards";
import Module from "./Module";

const NewsCategories = () => {
  return (
    <Module>
      <h1 className="text-2xl font-bold text-primary">News Categories</h1>
      <div className="grid grid-cols-4 grid-rows-2 p-5 mt-5 gap-4 w-[1600px]">
        {CATEGORY_CARDS.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            abstract={category.abstract}
            imagePath={category.imagePath}
            size={category.size}
          />
        ))}
      </div>
    </Module>
  );
};

export default NewsCategories;
