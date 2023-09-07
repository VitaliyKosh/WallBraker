import express, { Express } from 'express';
import formData from "express-form-data"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from '../router'
import os from "os"
import errorMiddleware from '../middlewares/errorMiddleware';

export default (app: Express) => {
    const formDataOptions = {
        uploadDir: os.tmpdir(),
        autoClean: true
    }

    app.use(formData.parse(formDataOptions));
    app.use(formData.format());
    app.use(formData.stream());
    app.use(formData.union());

    const corsOptions = {
        credentials: true,
        origin: process.env.CLIENT_URL
    }

    app.use(cors(corsOptions))

    app.use(express.json({ limit: '50mb' }))
    app.use(cookieParser())
    app.use('/api', router)
    app.use(errorMiddleware)
}