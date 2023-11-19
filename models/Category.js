const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: String,
    icon: {
        type: String,
        default: "/public/dist/img/placeholder.png",
    },
    subcategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
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

const Category = mongoose.model("Category", categorySchema)
module.exports = Category
