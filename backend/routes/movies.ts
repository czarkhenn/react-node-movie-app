import { Router, Request, Response } from 'express';
import axios from 'axios';
import { OMDBResponse, OMDBMovie } from '../interfaces/movies';
import redisClient from '../cache/redisClient';

const movieRoutes = Router();
const OMDB_API_KEY = process.env.OMDB_API_KEY || 'default_key';
const OMDB_URL = process.env.OMDB_URL || 'default_url.com';
const CACHE_TTL = parseInt(process.env.CACHE_TTL || "3600", 10);

movieRoutes.get('/', async (req: Request, res: Response): Promise<void> => {
  const response = {'message': 'Welcome to React Node App, visit `/movies`'}
  res.json(response)
});

movieRoutes.get('/movies', async (req: Request, res: Response): Promise<void> => {
  let { search } = req.query;
  const { page = 1 } = req.query;

  if (typeof search !== 'string' || !search) {
    search = 'popular'
  }

  const cacheKey = `movies:${search}:${page}`;

  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      res.json(JSON.parse(cachedData));
      return;
    }

    const response = await axios.get<OMDBResponse>(
      `${OMDB_URL}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(
        search
      )}&page=${page}`
    );

    if (response.data.Response === 'False') {
      res.status(404).json({ error: response.data.Error });
      return;
    }

    await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(response.data));

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from OMDB API' });
  }
});

movieRoutes.get(
  '/movie-detail',
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.query;

    if (typeof id !== 'string' || !id) {
      res.status(400).json({ error: 'Id query parameter is required' });
      return;
    }
    const cacheKey = `movie:${id}`;
    try {

      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        res.json(JSON.parse(cachedData));
        return;
      }
      const response = await axios.get<OMDBMovie>(
        `${OMDB_URL}/?apikey=${OMDB_API_KEY}&i=${id}`
      );

      if (response.data.Response === 'False') {
        res.status(404).json({ error: response.data.Error });
        return;
      }

      await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(response.data));
  
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from OMDB API' });
    }
  }
);

export default movieRoutes;
