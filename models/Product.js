const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    inventory: Number,
    poster: {
        type: String,
        default: "/public/dist/img/placeholder.png",
    },
    images: [String]
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
