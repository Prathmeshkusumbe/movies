'use client'
import { getSiteCookie } from '@/helper/general_helper';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function AuthLayout({children}) {
  const router = useRouter()
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    //const c = getSiteCookie('authtoken');
    if (isAuth) router.push('/')
  }, [isAuth]);
  return (
    <>
      {children}
    </>
  );
}

export default AuthLayout