import Cookies from "js-cookie";
import jwt from 'jsonwebtoken';
export const setSiteCookie = (key, value) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  const cookieString = `${key}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
};

export const getSiteCookie = (key) => {
  const value = Cookies.get(key);

  if (value) {
    return value;
  } else {
    return false;
  }
};
export const deleteSiteCookie = (key) => {
  Cookies.remove(key);
};

export function get_user_info_by_cookie(){
  const cookie = getSiteCookie('authtoken');
  if (cookie){
    const decrypt = jwt.verify(cookie, process.env.NEXT_PUBLIC_JWT_SECRET);
    return decrypt
  }
  return { firstName: '', lastName: '', username: '' }

}

export function get_movie_data(movieInfo){
  const {title, poster_path, release_data, vote_average} = movieInfo;
}

export function dateInformat(){
  // Define the start date
  const startDate = new Date('2024-02-27');

  // Format the start date
  const startMonth = startDate.toLocaleString('default', { month: 'short' });
  const startDay = startDate.getDate();
  const startYear = startDate.getFullYear();

  // Concatenate the formatted start date
  const formattedStartDate = `${startDay} ${startMonth} ${startYear}`;

  // Output the result
  return formattedStartDate;
}

export function convertTime(minutes) {
  // Calculate hours and minutes
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  // Format the result
  const formattedTime = `${hours}h ${mins}m`;

  return formattedTime;
}