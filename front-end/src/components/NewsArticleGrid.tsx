"use client";
import React, { useState } from "react";
import { DialogTrigger } from "react-aria-components";
import NewsModal from "./atoms/NewsModal";
import styles from "@/styles/customScrollbar.module.css";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsArticleGridProps {
  articles: NewsArticle[];
  category: string;
  loading?: boolean;
}

const NewsArticleGrid = ({
  articles,
  category,
  loading = false,
}: NewsArticleGridProps) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle>();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start w-3/4  p-10 ml-5 h-[calc(100vh-120px)] rounded-md bg-light-component dark:bg-dark-component">
      <div 
        className={`w-full max-w-[1200px] pb-20 pr-4 overflow-y-auto ${styles.customScrollbar}`}
      >
        <h1 className="text-2xl font-bold text-primary">{category} News</h1>

        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <div className="mt-5 flex-shrink-0">
            <button
              className="w-full text-left"
              onClick={() => {
                setSelectedArticle(articles[0]);
                setIsOpen(true);
              }}
            >
              <div className="relative rounded-lg h-[300px] md:h-[400px] w-full cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={articles[0]?.urlToImage}
                  alt={articles[0]?.title}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent rounded-lg" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-xl font-semibold mb-2">
                    {articles[0]?.title}
                  </h2>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-5 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {articles.slice(1).map((article) => (
                <button
                  key={article.url}
                  className="w-full text-left"
                  onClick={() => {
                    setSelectedArticle(article);
                    setIsOpen(true);
                  }}
                >
                  <div className="relative rounded-lg h-[250px] md:h-[300px] w-full cursor-pointer overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent rounded-lg" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h2 className="text-lg font-semibold mb-2">
                        {article.title}
                      </h2>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <NewsModal article={selectedArticle} />
        </DialogTrigger>
      </div>
    </div>
  );
};

export default NewsArticleGrid;
