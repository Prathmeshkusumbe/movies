"use client";
import { deleteSiteCookie, getSiteCookie } from '@/helper/general_helper';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth, setUser } from '../auth/store';

function Profile() {

  const { isAuth } = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  let menuName = isAuth ? 'Profile' : 'Login';
  let url = isAuth ? '/profile' : '/login';

  useEffect(()=>{
    const c = getSiteCookie('authtoken');
    if(c) dispatch(setIsAuth(true));
  },[])

  // //console.log(login)
  function handleLogout(){
    deleteSiteCookie('authtoken');
    dispatch(setIsAuth(false));
    dispatch(setUser({}))
  }


  return (
    <div className='flex'>
      <Link href={url}>{menuName}</Link>
      {isAuth ? <div onClick={handleLogout} className='pl-2 cursor-pointer'>Logout</div> : ''}
    </div>
  )
}

export default Profile