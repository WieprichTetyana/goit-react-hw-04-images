const BASE_URL = 'https://pixabay.com/api/';
const ApiKey = '10576665-e62c3128b6abe1ee57cde63fd';

export const fetchPicture = (value, page) => {
  return fetch(
    `${BASE_URL}?q=${value}&page=${page}&key=${ApiKey}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(res => res.json())
    .then(res => res);
};
