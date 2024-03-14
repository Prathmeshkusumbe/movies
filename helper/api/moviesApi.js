const bearer = process.env.NEXT_PUBLIC_MOVIES_BEARER;
const movieAPiUrl = process.env.NEXT_PUBLIC_MOVIE_API_URL;
export async  function fetchMovies(){

  try{

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: bearer
      }
    };

    let res = await fetch(`${movieAPiUrl}/3/trending/movie/day?language=en-US`, options)
    res = await res.json();
    //console.log(res);
    return {status:true, res:res};
  }
  catch (e){ return {status:false, e}}

}

export async function searchMovie(query){

  try {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: bearer
    }
  };



  let res = await fetch(`${movieAPiUrl}/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options);
  res = await res.json();
  console.log('search res',res);
  return {status:true,res};
  }
  catch(e){
    return {status:false}
  }
}

export async function getAllMovies(){
  try{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: bearer
      }
    };
    let res = await fetch(`${movieAPiUrl}/3/movie/popular`, options);
    res = await res.json();
    return {status:'true', res}
  }
  catch(e){
    return {status:false}
  }
}

export async function getMovieById(id){
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: bearer
      }
    };
    let res = await fetch(`${movieAPiUrl}/3/movie/${id}?language=en-US`, options);
    return await res.json();
  }
  catch(e){
    return {status:false, res:'getting detail of movie failed please try with vpn'}
  }
}


