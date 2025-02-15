const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsdata.io/api/1';

const CATEGORY_MAP = {
  'general': 'top',
  'technology': 'technology',
  'sports': 'sports',
  'science': 'science',
  'health': 'health'
} as const;

type CategoryKey = keyof typeof CATEGORY_MAP;

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export const getLatestNews = async (category: CategoryKey = 'general'): Promise<NewsArticle[]> => {
  try {
    const apiCategory = CATEGORY_MAP[category];
    const url = `${BASE_URL}/latest?apikey=${NEWS_API_KEY}&language=en&category=${apiCategory}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'success') {
      return data.results
        .filter((article: any) => article.image_url && article.description)
        .map((article: any) => ({
          title: article.title,
          description: article.description,
          url: article.link,
          urlToImage: article.image_url,
          publishedAt: article.pubDate,
          source: {
            name: article.source_name
          }
        }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}; 