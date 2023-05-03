import Image from 'next/image';
import React, { KeyboardEventHandler, MouseEventHandler } from 'react';
import logo from '../public/google-logo.webp';
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline';
import User from './User';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SearchHeaderOptions from './SearchHeaderOptions';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomParsedUrlQuery } from '../typing';

interface Props {
  queryValue: CustomParsedUrlQuery;
}

const SearchHeader = ({ queryValue }: Props) => {
  const [query, setQuery] = useState<string>(queryValue.q || '');
  const router = useRouter();
  const [nav, setNav] = useState<boolean>(false);

  useEffect(() => setQuery(queryValue.q || ''), [queryValue]);

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      router.push(
        `/search?q=${query.trim()}${
          queryValue.searchType ? '&searchType=image' : '&searchType='
        }&start=10`
      );
    }
  };
  const handleSubmit: MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault();
    router.push(
      `/search?q=${query.trim()}${
        queryValue.searchType ? '&searchType=image' : '&searchType='
      }&start=10`
    );
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setNav(true);
      } else {
        setNav(false);
      }
    });
  }, []);

  return (
    <header className=' sm:px-5 sm:py-3 px-2 py-1 border-b-[1px] border-b-gray-300'>
      {/* large screen */}

      <div className='hidden sm:flex sm:space-x-3 space-x-1 w-full'>
        <div
          className='max-w-[100px] h-auto cursor-pointer mt-2'
          onClick={() => router.push('/')}>
          <Image src={logo} loading='lazy' alt='logo' />
        </div>
        <div className='flex-1'>
          <div className='flex items-center border-2 px-5 py-2 shadow-md rounded-full max-w-3xl'>
            <input
              className=' focus:outline-none flex-1 w-full'
              type='text'
              placeholder='Search'
              value={query}
              onKeyDown={handleEnter}
              maxLength={2048}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <XMarkIcon
                onClick={() => setQuery('')}
                className='w-5 h-5 font-semibold cursor-pointer'
              />
            )}
            <div className='col-span-1 border-r-2 border-r-gray-500 w-[0.1px] h-5 mx-2' />
            <MicrophoneIcon className='w-5 h-5 text-blue-600 font-semibold cursor-pointer' />
            <MagnifyingGlassIcon
              onClick={handleSubmit}
              className='w-5 h-5 text-blue-600 font-semibold cursor-pointer'
            />
          </div>
          <div className='sm:inline-block hidden mt-3'>
            <SearchHeaderOptions searchType={queryValue.searchType} queryType={queryValue.q} />
          </div>
        </div>
        <div className='mt-2'>
          <User />
        </div>
      </div>
      <AnimatePresence>
        {nav && (
          <motion.div
            initial='closed'
            animate='open'
            exit='closed'
            variants={{
              open: { translateY: '0px' },
              closed: { translateY: '-100px' },
            }}
            transition={{ duration: 0.3 }}
            className={`border-b-2 bg-white sm:flex fixed top-0 w-full left-0 sm:space-x-3 space-x-1 px-5 py-2 hidden`}>
            <div
              className='max-w-[100px] h-auto cursor-pointer mt-2'
              onClick={() => router.push('/')}>
              <Image src={logo} loading='lazy' alt='logo' />
            </div>
            <div className='flex-1'>
              <div className='flex items-center border-2 px-5 py-2 shadow-md rounded-full max-w-3xl'>
                <input
                  className=' focus:outline-none flex-1 w-full'
                  type='text'
                  placeholder='Search'
                  value={query}
                  onKeyDown={handleEnter}
                  maxLength={2048}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <XMarkIcon
                    onClick={() => setQuery('')}
                    className='w-5 h-5 font-semibold cursor-pointer'
                  />
                )}
                <div className='col-span-1 border-r-2 border-r-gray-500 w-[0.1px] h-5 mx-2' />
                <MicrophoneIcon className='w-5 h-5 text-blue-600 font-semibold cursor-pointer' />
                <MagnifyingGlassIcon
                  onClick={handleSubmit}
                  className='w-5 h-5 text-blue-600 font-semibold cursor-pointer'
                />
              </div>
            </div>
            <User />
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile screen */}
      <div className='sm:hidden sticky top-0 w-full left-0 flex-col flex items-center sm:space-x-3 space-x-1'>
        <div className='flex items-center justify-between flex-1 w-full'>
          <Bars3Icon className='w-7 h-7 cursor-not-allowed' />
          <div className='max-w-[110px] h-auto cursor-pointer' onClick={() => router.push('/')}>
            <Image src={logo} loading='lazy' alt='logo' />
          </div>
          <div className='my-3'>
            <User />
          </div>
        </div>
        <div className='flex-1 w-full'>
          <div className='flex items-center border-2 px-5 py-2 shadow-md rounded-full'>
            <input
              className=' focus:outline-none flex-1 w-full'
              type='text'
              placeholder='Search'
              value={query}
              onKeyDown={handleEnter}
              maxLength={2048}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <XMarkIcon
                onClick={() => setQuery('')}
                className='w-5 h-5 font-semibold cursor-pointer'
              />
            )}
            <div className=' border-r-2 border-r-gray-500 w-[0.1px] h-5 mx-2' />
            <MagnifyingGlassIcon
              onClick={handleSubmit}
              className='w-5 h-5 text-blue-600 font-semibold cursor-pointer'
            />
          </div>

          <div className='sm:hidden inline-block mt-3'>
            <SearchHeaderOptions searchType={queryValue.searchType} queryType={queryValue.q} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;
