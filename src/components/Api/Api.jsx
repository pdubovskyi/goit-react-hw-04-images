import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '32028713-8f4458935a933d773f83236cb',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const onSearchImages = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });

  return data;
};
