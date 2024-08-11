import { Router } from 'express';
import { ProductsManager } from '../dao/ProductsManager.js';

export const router = Router();

router.get('/', async (req, res) => {
    try {
        let products = await ProductsManager.get();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error inesperado en el servidor",
            detalle: error.message
        });
    }
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
