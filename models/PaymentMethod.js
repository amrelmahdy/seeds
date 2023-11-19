const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: String, // credit card, PayPal, etc.
    cardNumber: String,
    expirationDate: String,
    cvv: String,
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

const Product = mongoose.model("Product", productSchema)
module.exports = Product
