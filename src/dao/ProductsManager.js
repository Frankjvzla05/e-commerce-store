import fs from 'fs';

export class ProductsManager {
    static path;

    // GET - Listar todos los productos
    static async get() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, { encoding: "utf-8" }));
        } else {
            return [];
        }
    }
    //POST - CREAR NUEVO PRODUCTO
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
    //DELETE - Eliminar producto
    static async delete(pid) {
        let products = await this.get();
        const productIndex = products.findIndex(p => p.pid === pid);

        if (productIndex === -1) {
            throw new Error(`Producto con id ${pid} no encontrado`);
        }

        products.splice(productIndex, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5));
    }

    // PUT - Actualizar producto por su PID
    static async update(pid, updatedFields) {
        let products = await this.get();
        const productIndex = products.findIndex(p => p.pid === pid);

        if (productIndex === -1) {
            throw new Error(`Producto con id ${pid} no encontrado`);
        }

        delete updatedFields.pid;

        products[productIndex] = { ...products[productIndex], ...updatedFields };

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 5));
        return products[productIndex];
    }
}
