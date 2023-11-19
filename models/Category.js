const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
    ar_name: String,
    en_name: String,
    icon: {
        type: String,
        default: "/public/dist/img/placeholder.png",
    },
    subcategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
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

const Category = mongoose.model("Category", categorySchema)
module.exports = Category
