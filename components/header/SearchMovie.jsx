import { searchMovie } from '@/helper/api/moviesApi';
import { Icon } from '@iconify/react'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

function SearchMovie() {

  const [query, setQuery] = useState('');
  const [searchTime, setSearchTime]= useState('');
  const [searching ,setSearching] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState({results:[]});
  const [searchOn, setSearchOn] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  function handleSearch(e) {
    setSearchOn(true)
    clearTimeout(searchTime);
    setQuery(e.target.value);
    setSearchTime(setTimeout(()=>{
      searchMovieInDb(e.target.value)
    },500))
  }

  async function searchMovieInDb(query){
    //console.log(query, 'in db')
    setSearching(true)
    const res = await searchMovie(query);
    setSearching(false);
    if(res.status)
    setSearchedMovies(res.res);
    else{
      alert('searching movie failed try vpn')
    }
  }

  function clearQuery() {
    setQuery('');
  }
  //console.log(searchedMovies,'hi')
  function mTitleClick(id){
    console.log('mTitleClick');
    router.push('/movies/'+id);
  }

  useEffect(()=>{

  },);

  function inputSearchFocus(){
    if (searchRef)
    searchRef.current?.classList.remove('hidden');
  }

  function inputSearchBlur(e){
    setTimeout(()=>{
      if (searchRef)
      searchRef.current?.classList.add('hidden');
    },300)

  }

  // useEffect(()=>{
  //   document.addEventListener('click', documentClick);
  // })

  function documentClick(e){
    console.log('yes doc',e.target)
  }

  return (
    <div className='relative'>
      <div className='relative flex rounded-full pr-4 border bg-slate-900 border-slate-500'>
        <input onFocus={inputSearchFocus} onBlur={inputSearchBlur} className='text-white outline-0 w-full ml-6 pr-2 pb-2 pt-1  h-10  bg-slate-900' value={query} onChange={handleSearch} placeholder='Search' type='text' />
        {query && <button onClick={clearQuery} className=''><Icon className='w-6 h-6 text-slate-300' icon='material-symbols-light:close' /></button>}
        <button className=''><Icon className='w-6 h-6 text-slate-300' icon='octicon:search-24' /></button>
      </div>
      {searchOn && (searchedMovies.results.length > 0) ?
        <div ref={searchRef} className='absolute top-10 w-full max-h-[300px] overflow-auto bg-slate-900 pl-6 mt-2 pt-4 rounded-xl'>
          {searchedMovies.results.map((m, i) => <div onClick={()=>mTitleClick(m.id)} className='cursor-pointer pb-4' key={i}>{m.title}</div>) }
      </div>
      : ''
      }
    </div>
  )
}

export default SearchMovie