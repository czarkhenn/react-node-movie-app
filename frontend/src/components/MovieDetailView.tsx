import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back</span>
        </button>

        {movie && (
          <>
            {/* Hero Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5ObyBQb3N0ZXI8L3RleHQ+PC9zdmc+'}
                    alt={movie.Title}
                    className="w-48 h-72 object-cover rounded-xl shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5ObyBQb3N0ZXI8L3RleHQ+PC9zdmc+';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-white mb-4">{movie.Title}</h1>
                  <div className="text-white/80 space-y-2 mb-6">
                    <p className="text-lg">
                      <span className="font-semibold text-purple-300">{movie.Year}</span> • {movie.Runtime} • {movie.Genre}
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">IMDB Rating:</span> {movie.imdbRating} ({movie.imdbVotes} votes)
                    </p>
                  </div>
                  <a
                    href={movie.Website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300 font-semibold"
                  >
                    Official Website
                  </a>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Overview Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                  <p className="text-white/80 leading-relaxed">{movie.Plot}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <h3 className="text-xl font-semibold text-white mb-4">Credits</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="font-medium text-white/60">Director:</span>
                      <span className="text-white">{movie.Director}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="font-medium text-white/60">Writer:</span>
                      <span className="text-white">{movie.Writer}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="font-medium text-white/60">Actors:</span>
                      <span className="text-white">{movie.Actors}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <h3 className="text-xl font-semibold text-white mb-4">Details</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="font-medium text-white/60">Language:</span>
                      <span className="text-white">{movie.Language}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="font-medium text-white/60">Country:</span>
                      <span className="text-white">{movie.Country}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="font-medium text-white/60">Awards:</span>
                      <span className="text-white">{movie.Awards}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="font-medium text-white/60">Box Office:</span>
                      <span className="text-white">{movie.BoxOffice}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="font-medium text-white/60">Production:</span>
                      <span className="text-white">{movie.Production}</span>
                    </div>
                  </div>
                </div>

                {/* Ratings Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                  <h3 className="text-xl font-semibold text-white mb-4">Ratings</h3>
                  <div className="space-y-3">
                    {movie.Ratings.map((rating, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="font-medium text-white/60">{rating.Source}:</span>
                        <span className="text-white font-semibold">{rating.Value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetailView;
