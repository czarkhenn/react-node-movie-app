import axios from 'axios';
import { MovieListResponse, MovieDetail } from './interfaces';

const API_URL = process.env.REACT_APP_API_URL;
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchMovies = async (search: string, page: number) => {
  const response = await api.get<MovieListResponse>('/movies', {
    params: {
      search: typeof search !== 'string' || !search ? 'popular' : search,
      page,
    },
  });
  return response.data;
};

export const getMovieDetail = async (id: string) => {
  const response = await api.get<MovieDetail>('/movie-detail', {
    params: { id: id },
  });
  return response.data;
};
