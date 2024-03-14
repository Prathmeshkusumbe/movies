'use client'
import { setIsAuth, setUser } from "@/components/auth/store";
import MovieInfoBox from "@/components/pages/Home/MovieInfoBox";
import { fetchMovies, getAllMovies } from "@/helper/api/moviesApi";
import { getSiteCookie, get_user_info_by_cookie } from "@/helper/general_helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";

export default function Home() {


  const dispatch = useDispatch();
  const [movieList, setMovieList] = useState([]);
  const [allMovieList, setallMovieList] = useState([]);
  const {watchList} = useSelector((state)=> state.movies);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  useEffect(()=>{
    let c = getSiteCookie("authtoken");
    if (c) {
      dispatch(setIsAuth(true));
      const userInfo = get_user_info_by_cookie();
      dispatch(setUser(userInfo));
    }
    getMovieList();
    getAllMovieList();
  },[])

  async function getMovieList(){
    const res = await fetchMovies();
    if(res.status)
    setMovieList(res.res.results);
    else{
      alert('failed to load movies in your region. please try vpn', res.e)
    }
  }

  async function getAllMovieList(){
    let res = await getAllMovies();
    if (res.status)
      setallMovieList(res.res.results);
    else {
      alert('failed to load movies in your region. please try vpn', res.e)
    }

  }


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    //slidesToShow: 20,
    slidesToScroll: 1 ,
    variableWidth: true,
    //autoplay: true,
    autoplaySpeed: 2000,
  };

  var settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    //slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };



  return (
    <>
    <main className="pt-20">
      <div className="max-w-[1200px] pl- ml-auto mr-auto" >
        {movieList.length > 0 ?
          <Slider {...settings}>
            {movieList.map((movieInfo, i) => <MovieInfoBox key={i} movieInfo={movieInfo} />)}
          </Slider>
        : ''}
      </div>
      <div className="max-w-[1200px] pl- ml-auto mr-auto" >
        <h1 className="text-3xl pt-4 pb-8">WatchList</h1>
        {watchList.length > 0 ?
            watchList.length > 8 ?
            <Slider {...settings2}>
             { watchList.map((w, i) => <MovieInfoBox key={i} movieInfo={w} />)}
            </Slider>
            : <div className="flex">{watchList.map((w, i) => <MovieInfoBox watchListP={true} key={i} movieInfo={w} />)}</div>
            : <div style={{
              backgroundImage: `url(${siteUrl}/cinema-hall2.jpg`
            }} className="bg-cover relative flex items-center justify-center w-[600px] h-[300px] bg-slate-900 ml-auto mr-auto" >
              <div className="absolute bg-opacity-50 bg-slate-900 w-full h-full"></div>
              <h2 className="z-9 relative text-2xl text-center">Add some movies to watchList to see them here.</h2>
              </div>}
      </div>
      <div className="max-w-[1200px] pl- ml-auto mr-auto" >
        <h1 className="text-3xl pt-4 pb-8">Popular</h1>
        {allMovieList.length > 0 ?
          <Slider {...settings}>
            {allMovieList.map((movieInfo, i) => <MovieInfoBox key={i} movieInfo={movieInfo} />)}
          </Slider>
          : ''}
      </div>
    </main>
    </>
  );
}
