'use client'
import checkLogin, { checkValidation } from '@/helper/login/checkLogin';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Register() {

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');



    let firstName = e.target['first-name'].value;
    let lastName = e.target['last-name'].value;
    let email =  e.target.email.value
    let password = e.target.password.value;
    let cPass = e.target['c-password'].value
    let username = e.target.username.value;

    const res = checkValidation(firstName, lastName, email, password, username, cPass);
    if (res.status) {
      console.log(res);
      setSuccessMsg('Register in successfull.');
      router.push('/login');
    } else {
      setError(res.msg);
    }
  }
  return (
    <div className='w-full min-h-full pt-[100px] pb-2 flex items-center justify-center'>
      <div className='rounded shadow bg-white text-black w-[350px] max-w-[100%] pl-4 pr-4 pt-6 pb-3'>
        <div>
          <form onSubmit={handleLogin}>
            <h1 className='text-center  text-xl pb-3'>Register</h1>
            {error ? <div className='-mt-2 text-center text-rose-600'>{error}</div> : ''}
            {successMsg ? <div className='text-center text-green-500'>{successMsg}</div> : ''}
            <div className='pt-2'>
              <label className='block text-sm pb-1'>First name</label>
              <input className='pl-2 outline-0 w-full border border-slate-700 rounded' name='first-name' placeholder='Firsr Name' />
            </div>
            <div className='pt-2'>
              <label className='block text-sm pb-1'>Last Name</label>
              <input className='pl-2 outline-0 w-full border border-slate-700 rounded' name='last-name' placeholder='Last Name' />
            </div>
            <div className='pt-2'>
              <label className='block text-sm pb-1'>Userame</label>
              <input className='pl-2 outline-0 w-full border border-slate-700 rounded' name='username' placeholder='username' />
              <p className='text-xs'>A valid username is min of 3 and max of 20 length and allow only alpha numeric characters along with underscorces and hypens</p>
            </div>
            <div className='pt-2'>
              <label className='block text-sm pb-1'>Email</label>
              <input className='pl-2 outline-0 w-full border border-slate-700 rounded' name='email' placeholder='email' />
            </div>
            <div className='pt-3'>
              <label className='block text-sm pb-1'>Password</label>
              <input type='password' className='pl-2 outline-0 w-full border border-slate-700 rounded' name='password' placeholder='password' />
            </div>
            <div className='pt-3'>
              <label className='block text-sm pb-1'>Confirm Password</label>
              <input type='password' className='pl-2 outline-0 w-full border border-slate-700 rounded' name='c-password' placeholder='confirm password' />
            </div>
            <div className='pt-5 pb-4 flex'>
              <button className='py-1 px-3 border rounded border-slate-500'>Submit</button>
            </div>
            <div className='pl-2'>Already have account <Link href='/login'>Login</Link></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register