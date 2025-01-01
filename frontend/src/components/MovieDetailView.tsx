import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Spinner } from 'react-bootstrap';
import { getMovieDetail } from '../api';
import { MovieDetail } from '../interfaces';

function MovieDetailView() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        if (id) {
          const details = await getMovieDetail(id);
          setMovie(details);
        }
        console.log(movie);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <Container className='mt-5 text-center'>
        <Spinner animation='border' variant='primary' />
      </Container>
    );
  }

  return (
    <Container className='mt-5'>
      {movie && (
        <Card>
          <Card.Img variant='top' src={movie.Poster} alt={movie.Title} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>
              <strong>Year:</strong> {movie.Year}
            </Card.Text>
            <Card.Text>
              <strong>Rated:</strong> {movie.Rated}
            </Card.Text>
            <Card.Text>
              <strong>Released:</strong> {movie.Released}
            </Card.Text>
            <Card.Text>
              <strong>Runtime:</strong> {movie.Runtime}
            </Card.Text>
            <Card.Text>
              <strong>Genre:</strong> {movie.Genre}
            </Card.Text>
            <Card.Text>
              <strong>Director:</strong> {movie.Director}
            </Card.Text>
            <Card.Text>
              <strong>Writer:</strong> {movie.Writer}
            </Card.Text>
            <Card.Text>
              <strong>Actors:</strong> {movie.Actors}
            </Card.Text>
            <Card.Text>
              <strong>Plot:</strong> {movie.Plot}
            </Card.Text>
            <Card.Text>
              <strong>Language:</strong> {movie.Language}
            </Card.Text>
            <Card.Text>
              <strong>Country:</strong> {movie.Country}
            </Card.Text>
            <Card.Text>
              <strong>Awards:</strong> {movie.Awards}
            </Card.Text>
            <Card.Text>
              <strong>Ratings:</strong>
            </Card.Text>
            <ul>
              {movie.Ratings.map((rating, index) => (
                <li key={index}>
                  {rating.Source}: {rating.Value}
                </li>
              ))}
            </ul>
            <Card.Text>
              <strong>Metascore:</strong> {movie.Metascore}
            </Card.Text>
            <Card.Text>
              <strong>IMDB Rating:</strong> {movie.imdbRating}
            </Card.Text>
            <Card.Text>
              <strong>IMDB Votes:</strong> {movie.imdbVotes}
            </Card.Text>
            <Card.Text>
              <strong>Box Office:</strong> {movie.BoxOffice}
            </Card.Text>
            <Card.Text>
              <strong>Production:</strong> {movie.Production}
            </Card.Text>
            <Card.Text>
              <strong>Website:</strong>{' '}
              <a href={movie.Website} target='_blank' rel='noopener noreferrer'>
                {movie.Website}
              </a>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default MovieDetailView;
