import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { getMovieDetail } from '../api';
import { MovieDetail } from '../interfaces';

const MovieDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        if (id) {
          const details = await getMovieDetail(id);
          setMovie(details);
        }
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
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Button variant="primary" onClick={() => navigate(-1)} className="mb-4">
        &larr; Back
      </Button>
      {movie && (
        <>
          <div className="movie-hero d-flex align-items-center mb-5">
            <img src={movie.Poster} alt={movie.Title} className="hero-poster me-4" />
            <div>
              <h1>{movie.Title}</h1>
              <p>
                <strong>{movie.Year}</strong> | {movie.Runtime} | {movie.Genre}
              </p>
              <p>
                <strong>IMDB Rating:</strong> {movie.imdbRating} ({movie.imdbVotes} votes)
              </p>
              <Button variant="primary" href={movie.Website} target="_blank">
                Official Website
              </Button>
            </div>
          </div>

          <Row>
            <Col md={8}>
              <h2>Overview</h2>
              <p>{movie.Plot}</p>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Director:</strong> {movie.Director}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Writer:</strong> {movie.Writer}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Actors:</strong> {movie.Actors}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <h2>Details</h2>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Language:</strong> {movie.Language}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Country:</strong> {movie.Country}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Awards:</strong> {movie.Awards}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Box Office:</strong> {movie.BoxOffice}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Production:</strong> {movie.Production}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <div className="mt-5">
            <h2>Ratings</h2>
            <ListGroup>
              {movie.Ratings.map((rating, index) => (
                <ListGroup.Item key={index}>
                  <strong>{rating.Source}:</strong> {rating.Value}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </>
      )}
    </Container>
  );
};

export default MovieDetailView;
