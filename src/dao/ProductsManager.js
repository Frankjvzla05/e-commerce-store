import fs from 'fs';

export class ProductsManager {
    static path;

    static async get() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }));
        } else {
            return [];
        }
    }

    static async create(product = {}) {
        /* Validaciones */
        if (!product.title || !product.description || !product.code || 
            !product.price || !product.status || !product.stock || !product.category) {
            throw new Error("Todos los campos son obligatorios excepto 'thumbnails'.");
        }

        let products = await this.get();
        let exists = products.find(p => p.title === product.title);
        if (exists) {
            throw new Error(`${product.title} ya existe en DB`);
        }

        let id = 1;
        if (products.length > 0) {
            id = Math.max(...products.map(d => d.pid)) + 1;
        }

        let newProduct = {
            pid: id,
            ...product
        };

        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5));
        return newProduct;
    }
}
