import { Router } from 'express';
// import { ProductsManager } from '../dao/ProductsManager.js';
import { ProductsManagerMongoDao as ProductsManager } from '../dao/ProductsManagerMongoDao.js';
export const router = Router();

router.get('/', async (req, res) => {
    let { page, limit, skip } = req.query;

    if (!page || isNaN(Number(page))) {
        page = 1;
    }

    if (!limit || isNaN(Number(limit))) {
        limit = 10;  
    } else {
        limit = Number(limit);
    }

    let productsPaginated;
    try {
        productsPaginated = await ProductsManager.getPaginate(Number(page));
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error inesperado en el servidor",
            detalle: error.message
        });
    }
    
    let products = productsPaginated;

    if(limit && skip){
        if (limit) {
            limit = Number(limit);
            if (isNaN(limit)) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `El argumento limit tiene que ser numérico` });
            }
        } else {
            limit = productsPaginated.length;
        }
    
        if (skip) {
            skip = Number(skip);
            if (isNaN(skip)) {
                res.setHeader('Content-Type', 'application/json');
                return res.status(400).json({ error: `El argumento skip tiene que ser numérico` });
            }
        } else {
            skip = 0;
        }
    
        products = productsPaginated.docs.slice(skip, skip + limit);
    }
    
    

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ products });
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