import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMovies } from '../api';
import { Movie } from '../interfaces';
import PaginationComponent from './Pagination';

const MovieListView = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieResults = async () => {
      setLoading(true);
      try {
        const initialMovies = await fetchMovies(search, currentPage);
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

    getMovieResults();
  }, [search, currentPage]); // Add dependencies to ensure proper updates

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setCurrentPage(1); // Reset to the first page on a new search
    }
  };

  const handleCardClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Bar */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">MovieApp</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <>
            {/* Movie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
              {movies.map((movie) => (
                <div
                  key={movie.imdbID}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => handleCardClick(movie.imdbID)}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <div className="aspect-[2/3] overflow-hidden">
                      <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5ObyBQb3N0ZXI8L3RleHQ+PC9zdmc+'}
                        alt={movie.Title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5ObyBQb3N0ZXI8L3RleHQ+PC9zdmc+';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                        {movie.Title}
                      </h3>
                      <p className="text-white/70 text-sm">{movie.Year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <PaginationComponent
                currentPage={currentPage}
                totalItems={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieListView;
