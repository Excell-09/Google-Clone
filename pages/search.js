import SearchHeader from '@/components/SearchHeader';
import { useRouter } from 'next/router';
import React from 'react';

const Search = () => {
  const router = useRouter();

  return (
    <>
      <SearchHeader queryValue={router.query} />
    </>
  );
};

export default Search;
