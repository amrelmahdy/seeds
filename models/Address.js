const mongoose = require("mongoose")
const Schema = mongoose.Schema

const addressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: String, // shipping or billing
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
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

const Address = mongoose.model("Address", addressSchema)
module.exports = Address
