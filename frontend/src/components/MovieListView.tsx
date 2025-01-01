import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Pagination,
} from 'react-bootstrap';
import { fetchMovies } from '../api';
import { Movie } from '../interfaces';

export default function MovieListView() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const getMovieList = fetchMovies;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getMovieResults = async () => {
    setLoading(true);
    try {
      const initialMovies = await getMovieList(search, currentPage);
      const { Search } = initialMovies;
      const results = Search;
      const { totalResults } = initialMovies;
      setMovies(results || []);
      setTotalPages(Math.ceil(Number(totalResults) / 10));
    } catch (error) {
      console.error('Error fetching initial movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieResults();
  }, [currentPage]);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container className='mt-5'>
      <Form className='d-flex flex-column align-items-center mb-4'>
        <Form.Control
          type='text'
          placeholder='Search movies'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='mb-2 w-50'
        />
        <Button onClick={getMovieResults} variant='primary'>
          Search
        </Button>
      </Form>
      {loading ? (
        <div className='text-center'>
          <Spinner animation='border' variant='primary' />
        </div>
      ) : (
        <>
          <Row>
            <Pagination className='justify-content-center mb-4'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}>
                    {page}
                  </Pagination.Item>
                )
              )}
            </Pagination>
            {movies.map((movie) => (
              <Col key={movie.imdbID} md={4} className='mb-4'>
                <Card className='h-100 d-flex flex-column'>
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
                    <Link
                      to={`/movie/${movie.imdbID}`}
                      className='btn btn-primary mt-3'>
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}
