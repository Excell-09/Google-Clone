import React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import Header from '@/components/Header';
import Image from 'next/image';
import logo from '@/public/google-logo.webp';
import logoG from '@/public/g-logo.webp';

const signin = ({ provider }) => {
  console.log(Object.values(provider));
  return (
    <>
      <Header />
      <main className='min-h-screen flex justify-center items-center px-3 overflow-hidden'>
        {Object.values(provider).map((provider) => (
          <section key={provider.id} className='flex justify-center items-center flex-col'>
            <div className='max-w-[300px] h-auto'>
              <Image src={logo} loading='lazy' alt='logo' />
            </div>
            <p className='mb-5 text-gray-700 text-base'>This project just for learning purpose</p>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className='flex justify-between px-4 py-2 rounded-full bg-slate-500 gap-3 text-lg text-white shadow-md items-center'>
              Sign In With {provider.name}
              <Image src={logoG} alt='logo-g' width={25} height={25} />
            </button>
          </section>
        ))}
      </main>
    </>
  );
};

export default signin;

export const getServerSideProps = async () => {
  const provider = await getProviders();
  return {
    props: { provider },
  };
};
