import React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import Header from '../../components/Header';
import Image from 'next/image';
import logo from '../../public/google-logo.webp';
import logoG from '../../public/g-logo.webp';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { authOptions } from '../api/auth/[...nextauth]';

const Home = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Header />
      <main className='min-h-screen flex justify-center items-center px-3 overflow-hidden'>
        {Object.values(providers).map((provider) => (
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

export default Home;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }
  const providers = await getProviders();
  return {
    props: { providers: providers ?? [] },
  };
};
