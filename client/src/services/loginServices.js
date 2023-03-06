import axios from 'axios';

const ID = import.meta.env.VITE_UNSPLASH_ID;
const baseUrl = 'api/login';

const loginUser = async (user) => {
  const result = await axios.post(`${baseUrl}`, user);
  return result.data;
};

const getUnSplashBackGround = async () => {
  const unsplash = await axios.get(`https://api.unsplash.com/photos/random/?client_id=${ID}&query=landscape`);
  return unsplash.data;
};

export default { loginUser, getUnSplashBackGround };
