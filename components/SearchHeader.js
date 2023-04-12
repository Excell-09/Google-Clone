import Image from 'next/image';
import React from 'react';
import logo from '@/public/google-logo.webp';
import {
  MagnifyingGlassIcon,
  PhotoIcon,
  XMarkIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline';
import User from './User';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SearchHeaderOption from './SearchHeaderOptions';
import SearchHeaderOptions from './SearchHeaderOptions';

const SearchHeader = ({ queryValue }) => {
  const [query, setQuery] = useState(queryValue.q || '');
  const router = useRouter();
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      router.push(`/search?q=${query.trim()}&searchType=`);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${query.trim()}`);
  };
  return (
    <header className=' sm:px-5 sm:py-3 px-2 py-1 border-b-[1px] border-b-gray-300'>
      <div className='flex items-center sm:space-x-3 space-x-1'>
        <div
          className='max-w-[70px] sm:max-w-[100px] h-auto cursor-pointer'
          onClick={() => router.push('/')}>
          <Image src={logo} loading='lazy' alt='logo' />
        </div>
        <div className='flex-1 '>
          <div className='flex items-center border-2 px-5 py-2 shadow-md rounded-full max-w-3xl'>
            <input
              className=' focus:outline-none flex-1 w-full'
              type='text'
              placeholder='Search'
              value={query}
              onKeyDown={handleEnter}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <XMarkIcon
                onClick={() => setQuery('')}
                className='w-5 h-5 font-semibold cursor-pointer'
              />
            )}
            <div className=' border-r-2 border-r-gray-500 w-[0.1px] h-5 mx-2' />
            <MicrophoneIcon className='w-5 h-5 text-blue-600 font-semibold cursor-pointer hidden sm:inline' />
            <MagnifyingGlassIcon
              onClick={handleSubmit}
              className='w-5 h-5 text-blue-600 font-semibold cursor-pointer'
            />
          </div>
          <div className='sm:inline hidden'>
            <SearchHeaderOptions searchType={queryValue.searchType} queryType={queryValue.q} />
          </div>
        </div>
        <User />
      </div>
      <div className='sm:hidden inline'>
        <SearchHeaderOptions searchType={queryValue.searchType} queryType={queryValue.q} />
      </div>
    </header>
  );
};

export default SearchHeader;
