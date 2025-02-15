import NewsArticleGrid from '@/components/NewsArticleGrid';
import React from 'react'
import { getLatestNews } from '@/services/newsService';

const TechnologyNewsPage = async () => {
  const newsArticles = await getLatestNews('technology');

  return (
    <div className="p-5">
      <NewsArticleGrid 
        articles={newsArticles} 
        category="Technology"
      />
    </div>
  )
}

export default TechnologyNewsPage;