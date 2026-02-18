import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import dogRoutes from './routes/dogRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api', dogRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
