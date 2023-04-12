import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

const User = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <img
        onClick={() => signOut()}
        className='cursor-pointer rounded-full h-14 w-14 p-2 hover:bg-gray-300 transition-all duration-300'
        src={session?.user?.image}
        alt='profile'
        referrerPolicy='no-referrer'
      />
    );
  }
  return (
    <button className='text-white text-base font-semibold bg-blue-500 px-3 py-1 rounded-md hover:ring transition-all duration-150' onClick={() => router.push('/auth/signin')}>
      Sign In
    </button>
  );
};

export default User;
