import { WSServer } from './config/ws/index';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import buildMiddlewares from './config/buildAppMiddlewares';
import mongoose from 'mongoose';

dotenv.config();

const wss = new WSServer()
const WS_PORT = process.env.WS_PORT

const app: Express = express()
const PORT = process.env.PORT

const DB_URL = process.env.DB_URL

buildMiddlewares(app)

mongoose.set('strictQuery', false)

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME,
}


const start = async () => {
  try {
    DB_URL && await mongoose.connect(DB_URL, dbOptions)
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    wss.listen(WS_PORT, () => {console.log(`WS Server started on PORT = ${WS_PORT}`)})
  } catch (e) {
    console.log(e)
  }
}

start()