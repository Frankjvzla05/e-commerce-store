import express from 'express';
import ProductsManager from './dao/ProductsManager';
const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ProductsManager.path="./data/products.js"

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
});

const server = app.listen(PORT, () => {
    console.log(`Server online en puerto ${PORT}`);
});

app.get('/products', async(req, res) => {
let products=await ProductsManager.getProducts()
console.log(products)
let {limit, skip}=req.query
    if(limit){
        limit=Number(limit)
        if(isNaN(limit)){
            return res.send("El argumento limit tiene que ser numerico")
        }
    }else{
        limit=products.length
    }

    if(skip){
        skip=Number(skip)
        if(isNaN(skip)){
            return res.send("El argumento skip tiene que ser numerico")
        }
    }else{
        skip=0
    }

    let resultado=products.slice(skip, skip+limit)
    res.send(resultado)
});