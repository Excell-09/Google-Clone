import SearchHeader from '../components/SearchHeader';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { dummyResponse } from '../dummyData';
import Parser from 'html-react-parser';
import PaginationButton from '../components/PaginationButton';
import { GetServerSidePropsContext } from 'next';
import { CustomParsedUrlQuery, ResultGoogle } from '../typing';
import Head from 'next/head';

type Props = {
  data: ResultGoogle;
};

interface CustomNextRouter extends NextRouter {
  query: {
    q: string;
    searchType: string;
    start: string;
  };
}

const Search = ({ data }: Props) => {
  const router = useRouter() as CustomNextRouter;
  const [query, setQuery] = useState<CustomParsedUrlQuery>(
    router.query || { q: '', searchType: '', start: '10' }
  );

  useEffect(() => setQuery(router.query), [router]);

  return (
    <>
      <Head>
        <title>Result Search</title>
      </Head>
      <SearchHeader queryValue={query} />
      <main className=' m-3 grid grid-cols-12'>
        {query.searchType === 'image' ? (
          <>
            <div className='col-span-full sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
              {data.items === undefined ? (
                <div className='min-h-[65vh] col-span-full'>
                  <p className='text-center'>{"There's no any result"}</p>
                </div>
              ) : (
                data.items.map((item) => (
                  <div className='group' key={item.title}>
                    <a
                      className='group-hover:underline block group-hover:text-blue-500 transition-all duration-150'
                      href={item?.image?.contextLink || ''}>
                      <div className='max-h-[200px] overflow-hidden'>
                        <img
                          src={item.link}
                          alt={item.title}
                          className=' h-full w-full object-cover'
                          loading='lazy'
                        />
                      </div>
                      <div>
                        <p className=' truncate'>{item.displayLink}</p>
                        <p className=' truncate'>{item.title}</p>
                      </div>
                    </a>
                  </div>
                ))
              )}
              <div className='col-span-full'>
                <PaginationButton />
              </div>
            </div>
          </>
        ) : (
          <>
            <p className='col-span-full text-gray-500 text-sm sm:col-start-2 sm:col-end-13 mt-1 mb-2'>
              About {data?.searchInformation?.formattedTotalResults || 0} results{' '}
              {data?.searchInformation?.formattedSearchTime || 0} seconds
            </p>
            <div className='col-span-full sm:col-start-2 sm:col-end-10'>
              {data?.items === undefined ? (
                <div className='min-h-[65vh]'>
                  <p className='text-center'>{"There's no any result"}</p>
                </div>
              ) : (
                data.items.map((item) => (
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
                ))
              )}
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

interface customGetServerSidePropsContext extends GetServerSidePropsContext {
  searchType: string;
}

export const getServerSideProps = async (context: customGetServerSidePropsContext) => {
  let data: any;
  const isDummyDataActive = false;
  const startIndex = context.query.start || 10;

  try {
    data = isDummyDataActive
      ? dummyResponse
      : await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${
            process.env.CX_KEY
          }&q=${context.query.q}${
            context.query.searchType && '&searchType=image'
          }&start=${startIndex}`
        )
          .then((res) => res.json())
          .catch(() => (data = dummyResponse as any));
  } catch (error) {
    data = dummyResponse;
  }
  console.log(data)
  return {
    props: { data },
  };
};
