import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movies';

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());
app.use('/', movieRoutes);

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
