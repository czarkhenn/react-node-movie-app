import { Router, Request, Response } from 'express';
import axios from 'axios';
import { OMDBResponse, OMDBMovie } from './interfaces';

const router = Router();
const OMDB_API_KEY = process.env.OMDB_API_KEY || 'default_key';
const OMDB_URL = process.env.OMDB_URL || 'default_url.com';

router.get('/movies', async (req: Request, res: Response): Promise<void> => {
  const { search } = req.query;
  const { page = 1 } = req.query;

  if (typeof search !== 'string' || !search) {
    res.status(400).json({ error: 'Search query parameter is required' });
    return;
  }

  try {
    const response = await axios.get<OMDBResponse>(
      `${OMDB_URL}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(
        search
      )}&page=${page}`
    );

    if (response.data.Response === 'False') {
      res.status(404).json({ error: response.data.Error });
      return;
    }
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from OMDB API' });
  }
});
router.get(
  '/movie-detail',
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.query;

    if (typeof id !== 'string' || !id) {
      res.status(400).json({ error: 'Id query parameter is required' });
      return;
    }

    try {
      const response = await axios.get<OMDBMovie>(
        `${OMDB_URL}/?apikey=${OMDB_API_KEY}&i=${id}`
      );

      if (response.data.Response === 'False') {
        res.status(404).json({ error: response.data.Error });
        return;
      }
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from OMDB API' });
    }
  }
);

export default router;
