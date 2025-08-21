import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



import categoryRoute from './routes/category.route.js';
import subcategoryRoute from './routes/subcategory.route.js';
import productRoute from './routes/product.route.js';
import { connectDB } from './config.js/db.js';


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/v1', categoryRoute);
app.use('/api/v1', subcategoryRoute);
app.use('/api/v1', productRoute);


app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
