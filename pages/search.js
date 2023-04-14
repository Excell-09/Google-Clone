import SearchHeader from '@/components/SearchHeader';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { dummyResponse } from '@/dummyData';
import Parser from 'html-react-parser';
import PaginationButton from '@/components/PaginationButton';

const Search = ({ data }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  useEffect(() => setQuery(router.query), [router]);
  console.log(data);
  return (
    <>
      <SearchHeader queryValue={query} />
      <main className='grid grid-cols-12 m-3'>
        {query.searchType === 'image' ? (
          <>
            <div className='col-span-full grid sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4'>
              {data.items.map((item) => (
                <div className='group' key={item.title}>
                  <a
                    className=' group-hover:underline group-hover:text-blue-500 transition-all duration-150'
                    href={item.formattedUrl}>
                    <div className='w-[200px] h-[200px] bg-red-500'></div>
                    <p className=' truncate'>{item.displayLink}</p>
                    <p className=' truncate'>{item.title}</p>
                  </a>
                </div>
              ))}
              <div className='col-span-full'>
                <PaginationButton />
              </div>
            </div>
          </>
        ) : (
          <>
            <p className='col-span-full text-gray-500 text-sm sm:col-start-2 sm:col-end-13 mt-1 mb-2'>
              About {data.searchInformation.formattedTotalResults} results
              {data.searchInformation.formattedSearchTime} seconds
            </p>
            <div className='col-span-full sm:col-start-2 sm:col-end-10'>
              {data.items.map((item) => (
                <div className='max-w-2xl mb-7' key={item.title}>
                  <div className='group'>
                    <a className='text-sm truncate block' href={item.formattedUrl}>
                      {item.formattedUrl}
                    </a>
                    <a
                      className='block group-hover:underline text-xl text-blue-500 font-semibold truncate'
                      href={item.formattedUrl}>
                      {item.title}
                    </a>
                    <a href={item.formattedUrl} className=''>
                      {Parser(item.htmlSnippet)}
                    </a>
                  </div>
                </div>
              ))}
              <div className='max-w-2xl'>
                <PaginationButton />
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  let data = [];
  const development = true;
  const startIndex = context.query.start || 10;

  try {
    data = development
      ? dummyResponse
      : await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${
            process.env.CX_KEY
          }&q=${context.query.q}${context.searchType && '&searchType='}&start=${startIndex}`
        )
          .then((res) => res.json())
          .catch(() => (data = dummyResponse));
  } catch (error) {
    data = dummyResponse;
  }
  return {
    props: { data },
  };
};
