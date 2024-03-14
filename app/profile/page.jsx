'use client'
import MovieInfoBox from '@/components/pages/Home/MovieInfoBox';
import { getSiteCookie, get_user_info_by_cookie, setSiteCookie } from '@/helper/general_helper';
import checkLogin, { checkValidation, checkValidationForUpdate } from '@/helper/login/checkLogin';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Slider from 'react-slick';

function Profile() {

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  const {watchList, fav} = useSelector((state)=>state.movies);

  const handleUpdate = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    let fnT = e.target['first-name'].value;
    let lnT = e.target['last-name'].value;

    let { firstName, lastName, username, email } = get_user_info_by_cookie();

    if (firstName == fnT && lastName == ln){
      setError("you haven't changed anything");
      return;
    }

    const res = checkValidationForUpdate(fnT, lnT);
    if (res.status) {
      console.log(res);
      const data = { firstName: fnT, lastName: lnT, username: 'testuser', email: 'test@test.com' }
      const authtoken = jwt.sign(data, secret);
      setSiteCookie('authtoken', authtoken)
      setSuccessMsg('update in successfull.');
    } else {
      setError(res.msg);
    }
  }

  const [fn, setFn ] = useState('');
  const [ln, setLn] = useState('');
  const [u,  setU] = useState('');

  useEffect(()=>{
    let { firstName, lastName, username } = get_user_info_by_cookie();
    setFn(firstName)
    setLn(lastName)
    setU(username)
  },[])


  return (
    <div className='w-full min-h-full pb-2  items-center'>
      <div className='w-full'>
        <h1 className='text-center text-3xl pb-8' >{`{Hello ${u}}` }</h1>
        <div className='rounded shadow bg-white text-black ml-auto mr-auto w-[350px] max-w-[100%] pl-4 pr-4 pt-6 pb-3'>
          <div>
            <form onSubmit={handleUpdate}>
              <h1 className='text-center  text-xl pb-3'>Update you information.</h1>
              {error ? <div className='-mt-2 text-center text-rose-600'>{error}</div> : ''}
              {successMsg ? <div className='text-center text-green-500'>{successMsg}</div> : ''}
              <div className='pt-2'>
                <label className='block text-sm pb-1'>First name</label>
                <input className='pl-2 outline-0 w-full border border-slate-700 rounded' name='first-name' placeholder='Firsr Name' onChange={(e) => setFn(e.target.value)} value={fn} />
              </div>
              <div className='pt-2'>
                <label className='block text-sm pb-1'>Last Name</label>
                <input className='pl-2 outline-0 w-full border border-slate-700 rounded' value={ln} name='last-name' onChange={(e)=>setLn(e.target.value)}  placeholder='Last Name' />
              </div>
              <div className='pt-5 pb-4 flex'>
                <button className='py-1 px-3 border rounded border-slate-500'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div className="max-w-[1200px] pl- ml-auto mr-auto" >
          <h1 className="text-3xl pt-4 pb-8">WatchList</h1>
          {watchList.length > 0 ?
            watchList.length > 8 ?
              <Slider {...settings2}>
                {watchList.map((w, i) => <MovieInfoBox key={i} movieInfo={w} />)}
              </Slider>
              : <div className="flex">{watchList.map((w, i) => <MovieInfoBox watchListP={true} key={i} movieInfo={w} />)}</div>
            : <div style={{
              backgroundImage: `url(http://localhost:3000/cinema-hall2.jpg?${new Date().getTime()})`
            }} className="bg-cover relative flex items-center justify-center w-[600px] h-[300px] bg-slate-900 ml-auto mr-auto" >
              <div className="absolute bg-opacity-50 bg-slate-900 w-full h-full"></div>
              <h2 className="z-9 relative text-2xl text-center">Add some movies to watchList to see them here.</h2>
            </div>}
        </div>
      </div>
      <div>
        <div className="max-w-[1200px] pl- ml-auto mr-auto" >
          <h1 className="text-3xl pt-4 pb-8">Favorite</h1>
          {fav.length > 0 ?
            fav.length > 8 ?
              <Slider {...settings2}>
                {fav.map((w, i) => <MovieInfoBox key={i} movieInfo={w} />)}
              </Slider>
              : <div className="flex">{fav.map((w, i) => <MovieInfoBox fav={true} key={i} movieInfo={w} />)}</div>
            : <div style={{
              backgroundImage: `url(http://localhost:3000/cinema-hall2.jpg?${new Date().getTime()})`
            }} className="bg-cover relative flex items-center justify-center w-[600px] h-[300px] bg-slate-900 ml-auto mr-auto" >
              <div className="absolute bg-opacity-50 bg-slate-900 w-full h-full"></div>
              <h2 className="z-9 relative text-2xl text-center">Add some movies to favorite to see them here.</h2>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Profile