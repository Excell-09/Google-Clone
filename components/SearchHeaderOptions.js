import { MagnifyingGlassIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React from 'react';

const SearchHeaderOptions = ({ searchType, queryType }) => {
  const router = useRouter();
  const switchSearchType = () => {
    router.push(`/search?q=${queryType}&searchType=${searchType === '' ? 'image' : ''}`);
  };
  return (
    <div className='flex space-x-3 mt-2'>
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
