const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
    }],
    total: Number,
    status: String, // pending, shipped, delivered, etc.
    created_at: {
        type: Date,
        default: Date.now()
    }
},
    {
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
                delete ret.__v;
                return ret;
            }

        }, timestamps: true
    })

const Order = mongoose.model("Order", orderSchema)
module.exports = Order
