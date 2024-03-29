import express from 'express';
import cors from 'cors';
import connectionToDB from './connection-to-db';
import dotenv from 'dotenv';
import { ExpressJwt } from './Helper/jwt';
import { ErrorHandler } from './Helper/errorHandler';

dotenv.config();

//Routes
const categoriesRoutes = require('./Routes/categories');
const productsRoutes = require('./Routes/products');
const usersRoutes = require('./Routes/users');
const ordersRoutes = require('./Routes/orders');

const startServer = () => {
  const app :any= express();

  const api = process.env.API_URL;
  let Options:any ={    
    origin : true,  
    credentials: true,
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
    optionsSuccessStatus : 200
  }
  app.use(cors(Options));
  app.use(express.json());
  app.use(ExpressJwt());
  app.use(ErrorHandler);
  app.use('/public/Image', express.static(__dirname + '/public/Image'));

  connectionToDB()
    .then(() => {
      console.log('Connected to database');

      let server = app.listen(process.env.PORT || 4000, () => {
        let port: any = server.address();
        console.log(`Server Running at ${port.port}`);
      });
    })
    .catch((err: any) => {
      console.log(err.message);
    });
  app.use(`${api}/categories`, categoriesRoutes);
  app.use(`${api}/products`, productsRoutes);
  app.use(`${api}/users`, usersRoutes);
  app.use(`${api}/orders`, ordersRoutes);
};

startServer();