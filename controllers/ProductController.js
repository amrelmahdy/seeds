const Product = require('../models/Product')
const { createError } = require('../utils/Helpers')
const { errorCodesEnum } = require('../Config')



module.exports = {
    getAll: async (req, res) => {
        try {
            const products = await Product.find({});
            res.json(products)
        } catch (err) {
            response = createError(errorCodesEnum.INTERNAL_SERVER_ERROR, "Whoops something went wrong");
            res.json(response)
        }
    },
    create: async (req, res, next) => {
        try {
            const newProduct = Product(req.body);
            newProduct.save()
            res.json(newProduct)
        } catch (err) {
            response = createError(errorCodesEnum.INTERNAL_SERVER_ERROR, "Whoops something went wrong");
            res.json(response)
        }
    },
    update: async (req, res) => {
        try {
            const updated = await Product.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } });
            if (updated) {
                res.json(updated)
            } else {
                response = createError(errorCodesEnum.NOT_FOUND, "Unable to update item or maybe it is not found");
                res.json(response);
            }

        } catch (err) {
            response = createError(errorCodesEnum.INTERNAL_SERVER_ERROR, "Whoops something went wrong");
            res.json(response);
        }

    },
    delete: async (req, res) => {
        try {
            const deleted = await Product.deleteOne({ _id: req.params.id });
            res.json(deleted)
        } catch (err) {
            response = createError(errorCodesEnum.INTERNAL_SERVER_ERROR, "Whoops something went wrong");
            res.json(response);
        }


    }
}