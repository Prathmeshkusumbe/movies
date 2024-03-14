'use client'
import { addToFavList, removeFromFav, updateWatchList } from "@/components/movies/store";
import PercentageCirlcle from "@/components/ui/PercentageCirlcle";
import { getMovieById } from "@/helper/api/moviesApi";
import { convertTime } from "@/helper/general_helper";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export default function Page({ params }) {

  const id = params.id;
  const {watchList,fav} = useSelector((state)=> state.movies);

  const dispatch = useDispatch();
  useEffect(()=>{
    getMovieDetail();
  },[]);
  const [mDetail, setMDetail] = useState(null);
  async function getMovieDetail(){
    let res = await getMovieById(id);
    console.log(res, id);
    setMDetail(res);
  }

  const { backdrop_path, title, release_date, genres, vote_average, tagline, overview, runtime} = mDetail || {};

  const bgPosterUrl = process.env.NEXT_PUBLIC_BG_POSTER_URL;
  const posterUrl = process.env.NEXT_PUBLIC_POSTER_URL;

  function get_year(date){
    date = new Date(date);
    console.log(date.getFullYear());
    return date.getFullYear();
  }

  function timeInformat(time){
    return convertTime(time);
  }

  function addToFav(){

  }

  async function addToWatch(){
    const res = watchList.find((ele) => ele.id == mDetail.id);
      res ? alert('already in watchist') : await dispatch(updateWatchList(mDetail)); alert('added to watchlist');
  }

  function handleFav(){

    const res = fav.find((ele) => ele.id == mDetail.id);
    if (!res) {
      dispatch(addToFavList(mDetail));
      alert('added in Favorite');
    }
    else {
      dispatch(removeFromFav(mDetail.id));
      alert('removed from Favorite');
    }

}

  console.log(release_date);
  return (
    <div>
      {mDetail  &&<div className="pt-16 pb-16 mb-20 bg-no-repeat bg-center bg-cover" style={{ background: `url(${bgPosterUrl}${backdrop_path})`}}>
        <div className="absolute top-0 left-0 w-full h-full bg-slate-900/[0.8]"></div>
        <div className="relative z-9 max-w-[1200px] ml-auto mr-auto">
          <div className="flex items-center">
            <div className=" w-[300px] h-[450px}">
              <img className="w-[300px] h-[450px}"  src={posterUrl + backdrop_path} alt='poster' />
            </div>
            <div className="pl-10">
              <h1 className="text-4xl">{title} {get_year(release_date)}</h1>
              <div><span>{release_date}&nbsp;</span>
                {genres.map((g) => <span key={g.id}>{g.name},&nbsp;</span>)}
              </div>
              <div className="relative flex items-center pt-7">
                <div className='bg-slate-700  rounded-full  inline-block relative'>
                  <span className=' w-full text-xs font-bold absolute pt-[8px] text-center inline-block'>{Math.floor(vote_average * 10)}</span>
                  <PercentageCirlcle per={Math.floor(vote_average * 10)} />
                </div>
                <div className="pl-4 text-xl semibold">User score</div>
                <div className="pl-3 flex items-center gap-2">
                  <div><Icon onClick={handleFav} className='w-8 h-8 cursor-pointer' icon='fluent:heart-16-filled'/></div>
                  <div><Icon onClick={addToWatch} className='w-8 h-8 cursor-pointer' icon='material-symbols-light:bookmark' /></div>
                </div>
                <div><span className="inline-block w-2 h-2 bg-white rounded-full"></span><span>&nbsp;{timeInformat(runtime)}</span></div>
              </div>
              <h2 className="text-lg pt-7"><em>{tagline}</em></h2>
              <h2 className="text-lg font-semibold pt-7">Overview</h2>
              <div>{overview}</div>
            </div>

          </div>
        </div>
      </div>}
    </div>
  )
}

