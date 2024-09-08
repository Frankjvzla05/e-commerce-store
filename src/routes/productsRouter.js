import { Router } from 'express';
// import { ProductsManager } from '../dao/ProductsManager.js';
import { ProductsManagerMongoDao as ProductsManager } from '../dao/ProductsManagerMongoDao.js';
export const router = Router();

router.get('/', async (req, res) => {
    let products
    try {
        products = await ProductsManager.get();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error inesperado en el servidor",
            detalle: error.message
        });
    }

    let { limit, skip } = req.query
    if (limit) {
        limit = Number(limit)
        if (isNaN(limit)) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `El argumento limit tiene que ser numerico` })
        }
    } else {
        limit = products.length
    }

    if (skip) {
        skip = Number(skip)
        if (isNaN(skip)) {
            // return res.send("El argumento skip tiene que ser numerico")
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `El argumento skip tiene que ser numerico` })
        }
    } else {
        skip = 0
    }

    let productos = products.slice(skip, skip + limit)
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ productos });
});

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;

        // Validaciones
        if (!title || !description || !code || !price || !status || !stock || !category) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios excepto 'thumbnails'."
            });
        }

        if (typeof price !== 'number' || typeof stock !== 'number') {
            return res.status(400).json({
                error: "El campo 'price' y 'stock' deben ser números."
            });
        }

        if (typeof status !== 'boolean') {
            return res.status(400).json({
                error: "El campo 'status' debe ser un booleano."
            });
        }

        let newProduct = await ProductsManager.create({
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        });

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ newProduct });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "Error al crear el producto",
            detalle: error.message
        });
    }
});

router.get('/:pid',async(req,res)=>{
    let {pid}=req.params
    pid=Number(pid)
    if(isNaN(pid)){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Ingrese un pid numérico`})
    }

    let products=await ProductsManager.get()
    let product=products.find(p=>p.pid===pid)
    if(!product){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`No existe producto con pid ${pid}`})
    }

    res.setHeader('Content-Type','application/json')
    res.status(200).json({product})
});

router.delete('/:pid', async (req, res) => {
    let { pid } = req.params;
    pid = Number(pid);
    if (isNaN(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese un pid numérico` });
    }

    try {
        await ProductsManager.delete(pid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: `Producto con pid ${pid} eliminado` });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "Error al eliminar el producto",
            detalle: error.message
        });
    }
});

router.put('/:pid', async (req, res) => {
    let { pid } = req.params;
    pid = Number(pid);
    if (isNaN(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese un pid numérico` });
    }

    const updatedFields = req.body;

    try {
        const updatedProduct = await ProductsManager.update(pid, updatedFields);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: `Producto con pid ${pid} actualizado`, updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "Error al actualizar el producto",
            detalle: error.message
        });
    }
});