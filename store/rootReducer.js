import auth from '@/components/auth/store'
import main from './mainReducer'
import movies from '@/components/movies/store'
const rootReducer = {
  main,
  auth,
  movies,
}

export default rootReducer;