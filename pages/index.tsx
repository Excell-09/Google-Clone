import Header from '../components/Header';
import logo from '../public/google-logo.webp';
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import { KeyboardEventHandler, MouseEventHandler, MutableRefObject, useRef } from 'react';
import { useRouter } from 'next/router';
import randomWord from '../utils/randomWord';
import { useState } from 'react';
import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const yearNow = new Date().getFullYear();
  const searchInputRef: MutableRefObject<HTMLInputElement> = useRef(null!);
  const router = useRouter();
  const [randomW, setRandomW] = useState<string>('Google');

  useEffect(() => {
    randomWord((res) => setRandomW(res));
  }, []);

  const search: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const searchInput = searchInputRef.current.value;
    if (searchInput) {
      router.push(`/search?q=${searchInput.trim()}&searchType=&start=10`);
    } else {
      router.push(`/search?q=${randomW}&searchType=&start=10`);
    }
    return;
  };

  const searchEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      const searchInput = searchInputRef.current.value;
      router.push(`/search?q=${searchInput.trim()}&searchType=&start=10`);
    }
    return;
  };

  return (
    <>
      <Head>
        <title>Google Clone</title>
      </Head>
      <Header />
      <main className='min-h-screen grid grid-cols-10 px-3'>
        <section className='flex justify-center items-center flex-col space-y-6 sm:col-start-3 sm:col-end-9 col-start-1 col-end-11 '>
          <div className='max-w-[300px] h-auto'>
            <Image src={logo} alt='logo-google' />
          </div>
          <div className='w-full'>
            <div className=' flex border-2 rounded-full px-3 py-2 justify-center space-x-2 items-center hover:shadow-lg focus-within:shadow-lg'>
              <MagnifyingGlassIcon className='w-5 h-5 text-gray-600' />
              <input
                ref={searchInputRef}
                type='text'
                placeholder='Search'
                maxLength={2048}
                className=' flex-1 focus:outline-none max-w-[90%]'
                onKeyDown={searchEnter}
              />
              <MicrophoneIcon className='w-5 h-5' />
            </div>
          </div>
          <div className='w-full flex justify-center items-center gap-3 flex-col sm:flex-row'>
            <button onClick={search} className='btn'>
              Google Search
            </button>
            <button className='btn'>
              <a href='https://www.google.com/doodles'>{"I'm Feeling Lucky"}</a>
            </button>
          </div>
        </section>
      </main>
      <footer className='fixed bottom-0 left-0 w-full text-center '>
        Copyright &copy; {yearNow} Jun Choi
      </footer>
    </>
  );
}
