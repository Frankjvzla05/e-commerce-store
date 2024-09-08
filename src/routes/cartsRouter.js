import { Router } from 'express';
// import { CartsManager } from '../dao/CartsManager.js';
import { CartsManagerMongoDao as CartsManager } from '../dao/CartsManagerMongoDao.js';
import { isValidObjectId } from 'mongoose';
export const router = Router();


// Obtener todos los carritos
router.get('/', async (req, res) => {
    try {
        let carts = await CartsManager.get();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ carts });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al obtener los carritos",
            detalle: error.message
        });
    }
});

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const cartData = req.body;
        let newCart = await CartsManager.create(cartData);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ newCart });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear el carrito",
            detalle: error.message
        });
    }
});

// Listar productos en un carrito por ID
router.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    // cid = Number(cid);
    // if (isNaN(cid)) {
    if(!isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Ingrese un cid numérico` });
    }

    try {
        let cart = await CartsManager.getById(cid);
        if (!cart) {
            return res.status(404).json({ error: `Carrito con id ${cid} no encontrado` });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ cid: cart.cid, products: cart.products });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al obtener el carrito",
            detalle: error.message
        });
    }
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    let { cid, pid } = req.params;
    cid = Number(cid);
    pid = Number(pid);

    if (isNaN(cid) || isNaN(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `cid y pid deben ser numéricos` });
    }

    try {
        let updatedCart = await CartsManager.addProductToCart(cid, pid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ updatedCart });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al agregar el producto al carrito",
            detalle: error.message
        });
    }
});
