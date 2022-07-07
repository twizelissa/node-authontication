import express, { json, Router, urlencoded } from 'express';
import cors from "cors";
import './src/config/dbConfig.js';
import userRoutes from './src/routers/userRouters.js';
import authRoutes from './src/routers/authRouters.js';



const app = express();
app.use(cors());

app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to electricity seller");
});

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/auth',authRoutes);



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. I.C`);
});

