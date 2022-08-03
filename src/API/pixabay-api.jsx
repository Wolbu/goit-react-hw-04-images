const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28346013-699c033653f8987279bd73509';
const imageType = 'photo';
const orientation = 'horizontal';

const fetchImages = (query, page) => {
  return fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=${imageType}&orientation=${orientation}&per_page=12`
  );
};

const API = {
  fetchImages,
};

export default API;
