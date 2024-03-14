'use client'
import React, { useState } from 'react'
import Profile from './Profile'
import SearchMovie from './SearchMovie'
import { get_user_info_by_cookie } from '@/helper/general_helper';
import { useSelector } from 'react-redux';
import Link from 'next/link';


function Header() {

  const {user} = useSelector((state)=>state.auth);
  //let username

  return (
    <header className='bg-black fixed w-full z-10'>
      <div className='flex items-center py-8 px-10 justify-between'>
        <div>Hello {user ? user.username : ''}</div>
        <Link href='/' >Movies</Link>
        <div className='basis-[732px]'><SearchMovie /></div>
        <div><Profile /></div>
      </div>
    </header>
  )
}

export default Header