import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema({
    pid: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: [String]
}, {
    timestamps: true
});
productsSchema.plugin(paginate)
export const productsModel = mongoose.model('products', productsSchema);