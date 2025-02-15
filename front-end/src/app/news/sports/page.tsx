"use client";
import NewsArticleGrid from '@/components/NewsArticleGrid';
import { getLatestNews } from '@/services/newsService';
import React, { useEffect, useState } from 'react';
import type { NewsArticle } from '@/services/newsService';

const SportsNewsPage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const newsArticles = await getLatestNews('sports');
      setArticles(newsArticles);
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="p-5">
      <NewsArticleGrid 
        articles={articles}
        category="Sports"
        loading={loading}
      />
    </div>
  );
};

export default SportsNewsPage;