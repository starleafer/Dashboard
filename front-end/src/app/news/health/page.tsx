"use client";
import NewsArticleGrid from '@/components/NewsArticleGrid';
import { getLatestNews } from '@/services/newsService';
import React, { useEffect, useState } from 'react';
import type { NewsArticle } from '@/services/newsService';

const HealthNewsPage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const newsArticles = await getLatestNews('health');
      setArticles(newsArticles);
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="p-5">
      <NewsArticleGrid 
        articles={articles}
        category="Health"
        loading={loading}
      />
    </div>
  );
};

export default HealthNewsPage;
