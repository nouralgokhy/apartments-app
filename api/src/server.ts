import express from 'express';
import routes from './routes';
import { swaggerSpec } from './swagger';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true 
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});