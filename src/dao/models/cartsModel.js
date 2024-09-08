import mongoose from "mongoose";

const productInCartSchema = new mongoose.Schema({
    product: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    cid: {
        type: Number,
        required: true,
        unique: true
    },
    products: [productInCartSchema]
}, {
    timestamps: true
});

export const cartModel = mongoose.model('carts', cartSchema);