import SearchHeader from '@/components/SearchHeader';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  useEffect(() => setQuery(router.query), [router]);

  return (
    <>
      <SearchHeader queryValue={query} />
    </>
  );
};

export default Search;
