import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieListView from './components/MovieListView';
import MovieDetailView from './components/MovieDetailView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MovieListView />} />
        <Route path='/movie/:id' element={<MovieDetailView />} />
      </Routes>
    </Router>
  );
}

export default App;
