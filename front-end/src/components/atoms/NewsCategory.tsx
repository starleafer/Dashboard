import React from 'react';
import CustomButton from './CustomButton';
import { useRouter } from 'next/navigation';

interface NewsCategoryProps {
  label: string;
  path: string;
}

const NewsCategory = ({ label, path }: NewsCategoryProps) => {
  const router = useRouter();
  
  return (
    <li>
      <CustomButton
        variant="text"
        label={label}
        size="small"
        onPress={() => router.push(`/news/${path}`)}
      />
    </li>
  );
};

export default NewsCategory; 