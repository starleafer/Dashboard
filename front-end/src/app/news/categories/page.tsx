import React from "react";
import { CATEGORY_CARDS } from "@/constants/categoryCards";
import CategoryGrid from "@/components/CategoryGrid";

const data = CATEGORY_CARDS;

const NewsCategoriesPage = () => {
  return (
    <div>
      <CategoryGrid data={data} />
    </div>
  );
};

export default NewsCategoriesPage;
