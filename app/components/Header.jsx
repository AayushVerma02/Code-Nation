import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='bg-black text-white shadow-md'>
      <div className='flex justify-between items-center w-[80%] mx-auto py-3 h-[70px]'>
        {/* Logo */}
        <div>
          <Link href='/'>
            <img src='/favicon.ico' alt='logo' className='h-[90px] cursor-pointer object-cover' />
          </Link>
        </div>
        
        {/* Navigation */}
        <nav>
          <ul className='flex justify-center items-center gap-5 font-medium text-gray-300 text-md'>
            <li>
              <Link href='/hireUs' className='hover:text-blue-400 transition duration-300'>Hire Us</Link>
            </li>
            <li>
              <Link href='/ourWork' className='hover:text-blue-400 transition duration-300'>Our Work</Link>
            </li>
            <li>
              <Link href='/collaborate' className='hover:text-blue-400 transition duration-300'>Collaborate </Link>
            </li>
            <li>
              <Link href='/track' className='hover:text-blue-400 transition duration-300'>Track</Link>
            </li>
            <li>
              <Link href='/insight' className='hover:text-blue-400 transition duration-300'>Insight</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;