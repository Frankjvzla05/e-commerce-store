import express from 'express';
import {engine} from 'express-handlebars';
import {Server} from 'socket.io'
import { connDB } from './connDB.js';

import { router as productsRouter } from './routes/productsRouter.js';
import { router as cartsRouter } from './routes/cartsRouter.js';
import { router as vistasRouter } from './routes/vistasRouter.js';

import { ProductsManager } from './dao/ProductsManager.js';
import { CartsManager } from './dao/CartsManager.js';
import { config } from './config/config.js';

let io

ProductsManager.path = "./src/data/products.json";
CartsManager.path = "./src/data/carts.json";

const PORT = config.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", vistasRouter)

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
});

app.use(
    "/api/products", 
    (req, res, next)=>{
        req.io=io

        next()
    },
    productsRouter
)

const server = app.listen(PORT, () => {
    console.log(`Server online en puerto ${PORT}`);
});

io=new Server(server)  //websockets server

connDB()