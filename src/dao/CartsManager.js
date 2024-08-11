import fs from "fs";

export class CartsManager {
    static path;

    // Obtener listado de carritos
    static async get() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }));
        } else {
            return [];
        }
    }

    // Obtener un carrito por su ID
    static async getById(cid) {
        let carts = await this.get();
        return carts.find(c => c.cid === cid);
    }

    // Crear un nuevo carrito
    static async create() {
        let carts = await this.get();
        let id = 1;
        if (carts.length > 0) {
            id = Math.max(...carts.map(c => c.cid)) + 1;
        }

        let newCart = {
            cid: id,
            products: []
        };

        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 5));
        return newCart;
    }

    // Verificar si el producto existe en ProductsManager
    static async productExists(pid) {
        const { ProductsManager } = await import('./ProductsManager.js');
        let products = await ProductsManager.get();
        return products.some(p => p.pid === pid);
    }

    // Agregar un producto al carrito
    static async addProductToCart(cid, pid) {
        let carts = await this.get();
        let cart = carts.find(c => c.cid === cid);

        if (!cart) {
            throw new Error(`Carrito con id ${cid} no encontrado`);
        }

        // Verificar si el producto existe
        if (!(await this.productExists(pid))) {
            throw new Error(`Producto con id ${pid} no encontrado`);
        }

        let productIndex = cart.products.findIndex(p => p.product === pid);

        if (productIndex === -1) {
            // Si el producto no está en el carrito, lo agrega con quantity 1
            cart.products.push({ product: pid, quantity: 1 });
        } else {
            // Si el producto ya está en el carrito, incrementa quantity
            cart.products[productIndex].quantity += 1;
        }

        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 5));
        return cart;
    }
}
