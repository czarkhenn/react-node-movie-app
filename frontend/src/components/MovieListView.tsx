import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Spinner } from 'react-bootstrap';
import { fetchMovies } from '../api';
import { Movie } from '../interfaces';
import PaginationComponent from './Pagination';

const MovieListView = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const getMovieList = fetchMovies;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const getMovieResults = async () => {
    setLoading(true);
    try {
      const initialMovies = await getMovieList(search, currentPage);
      const { Search } = initialMovies;
      const results = Search;
      const { totalResults } = initialMovies;
      setMovies(results || []);
      setTotalPages(Number(totalResults));
    } catch (error) {
      console.error('Error fetching initial movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieResults();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      getMovieResults();
      event.preventDefault();
    }
  };

  const handleCardClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Container className='mt-5'>
      <Form className='d-flex justify-content-center align-items-center mb-4'>
        <Form.Control
          type='text'
          placeholder='Search movies'
          value={search}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearch(e.target.value)}
          className='me-2 w-50'
        />
      </Form>
      {loading ? (
        <div className='text-center'>
          <Spinner animation='border' variant='primary' />
        </div>
      ) : (
        <>
          <Row className='d-flex justify-content-center mb-3'>
            <Col xs='auto'>
              <PaginationComponent
                currentPage={currentPage}
                totalItems={totalPages}
                onPageChange={handlePageChange}
              />
            </Col>
          </Row>
          <Row className='justify-content-center'>
            {movies.map((movie) => (
              <Col
                key={movie.imdbID}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                className='mb-4'>
                <Card
                  className='h-100 d-flex flex-column card-clickable'
                  onClick={() => handleCardClick(movie.imdbID)}>
                  <Card.Img
                    variant='top'
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                  <Card.Body className='d-flex flex-column justify-content-between'>
                    <div>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>{movie.Year}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default MovieListView;
