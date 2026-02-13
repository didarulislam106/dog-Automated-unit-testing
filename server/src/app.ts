import express from 'express';
import dogRoutes from './routes/dogRoutes';

const app = express();

app.use(express.json());
app.use('/api/dogs', dogRoutes);

export default app;
