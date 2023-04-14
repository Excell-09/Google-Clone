import Link from 'next/link';
import User from './User';

const Header = () => {
  return (
    <header className='flex justify-between items-center py-3 px-5 text-sm text-gray-700 fixed right-0 w-full'>
      <div className='flex space-x-3 items-center'>
        <Link href='https://about.google/' className='link'>
          About
        </Link>
        <Link href='https://store.google.com/us/?pli=1&hl=en-US' className='link'>
          Store
        </Link>
      </div>
      <div className='flex space-x-3 items-center'>
        <Link href='https://mail.google.com/mail/u/0/#inbox' className='link'>
          Gmail
        </Link>
        <Link href={`/search?q=google&searchType=image&start=10`} className='link'>
          Images
        </Link>
        <User />
      </div>
    </header>
  );
};

export default Header;
