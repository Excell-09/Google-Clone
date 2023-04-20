import { MagnifyingGlassIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  searchType: string;
  queryType: string;
}

const SearchHeaderOptions = ({ searchType, queryType }: Props) => {
  const router = useRouter();
  const switchSearchType = () => {
    router.push(`/search?q=${queryType}&searchType=${searchType === '' ? 'image' : ''}&start=10`);
  };
  return (
    <div className='flex space-x-3'>
      <p
        className={`${searchType === '' ? 'nav-link-active' : 'nav-link'}`}
        onClick={switchSearchType}>
        <MagnifyingGlassIcon className='h-5 w-5' />
        All
      </p>
      <p
        className={`${searchType === 'image' ? 'nav-link-active' : 'nav-link'}`}
        onClick={switchSearchType}>
        <PhotoIcon className='h-5 w-5' />
        Images
      </p>
    </div>
  );
};

export default SearchHeaderOptions;
