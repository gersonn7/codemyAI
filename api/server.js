import express from 'express';
import technologyRoutes from './src/routes/technology.routes.js'
import cors from 'cors'

const app = express();
const PORT = 3001;

app.use(cors({}))
app.use(express.json())

app.use('/api/technology', technologyRoutes);

app.listen(PORT, ()=> {
    console.log(PORT)
})