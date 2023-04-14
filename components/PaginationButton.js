import Link from 'next/link';
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

const PaginationButton = () => {
  const router = useRouter();
  let startIndex = Number(router.query.start) || 1;
  return (
    <div className='flex justify-between items-center'>
      {startIndex >= 10 && (
        <Link
          href={`/search?q=${router.query.q}&searchType=${router.query.searchType}&start=${
            startIndex - 10
          }`}
          className='flex justify-center items-center flex-col group text-blue-500'>
          <ChevronLeftIcon className='w-5 h-5' />
          <p className='group-hover:underline'>Previous</p>
        </Link>
      )}
      <Link
        href={`/search?q=${router.query.q}&searchType=${router.query.searchType}&start=${
          startIndex + 10
        }`}
        className='flex justify-center items-center flex-col group text-blue-500'>
        <ChevronRightIcon className='w-5 h-5' />
        <p className='group-hover:underline'>Next</p>
      </Link>
    </div>
  );
};

export default PaginationButton;
