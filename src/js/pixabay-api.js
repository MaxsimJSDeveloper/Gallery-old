import axios from 'axios';

const API_KEY = '42920910-4418ce5fcb505a601cb14954f';
const baseURL = 'https://pixabay.com/api/';

export async function fetchImages(searchQuery, page, perPage) {
  try {
    const response = await axios.get(baseURL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
