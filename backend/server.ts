import 'dotenv/config'
import express from 'express'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 5000

// Routes
import userRoutes from './routes/userRoutes'
import dashboardRoutes from './routes/dashboardRoutes'
import tagRoutes from './routes/tagRoutes'
import blogRoutes from './routes/blogRoutes'
import writerRoutes from './routes/writerRoutes'
import searchRoutes from './routes/searchRoutes'
import votesRoutes from './routes/votesRoutes'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
));

app.use('/users',userRoutes)
app.use('/dashboard',dashboardRoutes)
app.use('/',tagRoutes)
app.use('/blog',blogRoutes)
app.use('/writers',writerRoutes)
app.use('/',searchRoutes)
app.use('/votes',votesRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})