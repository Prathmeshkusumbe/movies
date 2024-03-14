import PercentageCirlcle from '@/components/ui/PercentageCirlcle';
import { dateInformat } from '@/helper/general_helper';
import React, { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from '@iconify/react';
import { DropDownList } from '@/components/ui/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavList, removeFromFav, removeFromWatchList, updateWatchList } from '@/components/movies/store';
import { useRouter } from 'next/navigation';

function MovieInfoBox({ movieInfo, watchListP }) {
  let { title, poster_path, release_date, vote_average, id } = movieInfo;
  vote_average = Math.floor(vote_average * 10);
  release_date = dateInformat(release_date);
  const media_url = process.env.NEXT_PUBLIC_POSTER_URL;
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const {watchList, fav} = useSelector((state)=>state.movies);
  const router = useRouter();

  function handleMoreOption(action){
    console.log('test', action);
    if(action == 'watchlist'){
      const res = watchList.find((ele) => ele.id == movieInfo.id);
      res ? alert('already in watchist') : dispatch(updateWatchList(movieInfo))
    }
    if (action == 'rwatchlist') {
      dispatch(removeFromWatchList(movieInfo.id));
    }
    if (action == 'fav') {
      const res = fav.find((ele) => ele.id == movieInfo.id);
      if(!res) {
        dispatch(addToFavList(movieInfo));
        alert('added in Favorite');
      }
      else{
        dispatch(removeFromFav(movieInfo.id));
        alert('removed from Favorite');
      }

    }
    setShowOptions(false);
  }
  function moreOptions() {
    if (watchListP) {
      return [{
        label: <div className='cursor-pointer text-sm font-semibold'>Fav</div>,
        action: () => handleMoreOption('fav'),
      },
      {
        label: <div className='cursor-pointer text-sm font-semibold'>Remove from Watchlist</div>,
        action: () => handleMoreOption('rwatchlist')
      }
      ]
    }
    return [{
      label: <div className='cursor-pointer  text-sm font-semibold'>Fav</div>,
      action: () => handleMoreOption('fav'),
    },
    {
      label: <div className='cursor-pointer text-sm font-semibold'>Add to Watchlist</div>,
      action:()=>handleMoreOption('watchlist')
    }
  ]

  }

  function movieBoxClicked(){
    router.push('/movies/'+id);
  }
  return (
    <div  className='cursor-pointer relative w-[165px] pl-2 pr-2' >
      <div onClick={movieBoxClicked}  className='w-[150px]'><img className='rounded-md border shadow border-slate-600 w-[150px] max-w-[100%] h-[225px]' src={media_url+'/'+poster_path} alt={title}/></div>
      <div className='bg-slate-700 rounded-full  inline-block relative -mt-7 ml-3'>
        <span className=' w-full text-xs font-bold absolute pt-[8px] text-center inline-block'>{vote_average}</span>
        <PercentageCirlcle per={vote_average}/>
      </div>
      <div><h2>{title}</h2></div>
      <p className='text-sm'>{release_date}</p>
      <div onClick={()=>setShowOptions(!showOptions)} className='rounded-full shadow-[1px_1px_6px_1px_rgba(0,0,0)] top-1 right-3 absolute '>
        <Icon className=' cursor-pointer w-5 h-5' icon='fluent:more-circle-16-filled' />
      </div>
      {showOptions && <div className='absolute top-10 right-0'><DropDownList data={moreOptions(id)} /></div>}
    </div>
  )
}

export default MovieInfoBox;




