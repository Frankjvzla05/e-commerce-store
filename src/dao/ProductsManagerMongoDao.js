import { productsModel } from "./models/productsModel.js";


export class ProductsManagerMongoDao {
    static path;

    // GET - Listar todos los productos
    static async get() {
        return await productsModel.find().lean()

    }
    static async getPaginate(page=1, limit = 10) {
        return await productsModel.paginate({},{lean:true, page, limit})

    }
    //POST - CREAR NUEVO PRODUCTO
    static async create(product = {}) {
        // Obtener el último pid usado
        const lastProduct = await productsModel.findOne({}, {pid: 1}, { sort: { pid: -1 } });
        const nextPid = lastProduct ? lastProduct.pid + 1 : 1;

        // Agregar el pid al producto
        const productWithPid = { ...product, pid: nextPid };

        let newProduct = await productsModel.create(productWithPid);
        return newProduct.toObject();
    }
    //DELETE - Eliminar producto
    static async delete(pid) {
        return await productsModel.findOneAndDelete({ pid }).lean();
    }

    // PUT - Actualizar producto por su PID
    static async update(pid, updatedFields) {

        return await productsModel.findOneAndUpdate({ pid }, updatedFields, { new: true }).lean();
    }
}
