import { cartModel } from "./models/cartsModel.js";
import { productsModel } from "./models/productsModel.js";

export class CartsManagerMongoDao {
    // Obtener listado de carritos
    static async get() {
        return await cartModel.find().lean();
    }

    // Obtener un carrito por su ID
    static async getById(cid) {
        return await cartModel.findOne({ cid: cid }).lean();
    }

    // Crear un nuevo carrito
    static async create(cartData = {}) {
        const lastCart = await cartModel.findOne({}, { cid: 1 }, { sort: { cid: -1 } });
        const nextCid = lastCart ? lastCart.cid + 1 : 1;

        const newCart = {
            cid: nextCid,
            products: cartData.products || []
        };

        return await cartModel.create(newCart);
    }

    // Verificar si el producto existe
    static async productExists(pid) {
        return await productsModel.exists({ pid: pid });
    }

    // Agregar un producto al carrito
    static async addProductToCart(cid, pid) {
        const cart = await cartModel.findOne({ cid: cid });
        if (!cart) {
            throw new Error(`Carrito con id ${cid} no encontrado`);
        }

        if (!(await this.productExists(pid))) {
            throw new Error(`Producto con id ${pid} no encontrado`);
        }

        const productIndex = cart.products.findIndex(p => p.product === pid);

        if (productIndex === -1) {
            cart.products.push({ product: pid, quantity: 1 });
        } else {
            cart.products[productIndex].quantity += 1;
        }

        await cart.save();
        return cart;
    }
}