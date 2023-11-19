const Category = require('../models/Category')
const { createError } = require('../utils/Helpers')
const { errorCodesEnum } = require('../Config')



module.exports = {
    getAll: async (req, res) => {
        const categories = await Category.find({});
        res.json(categories)
    },
    create: async (req, res, next) => {
        try {
            const newCategory = Category(req.body);
            newCategory.save()
            res.json(newCategory)
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res) => {
        try {
            const updated = await Category.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } });
            if (updated) {
                res.json(updated)
            } else {
                response = createError(errorCodesEnum.NOT_FOUND, "Unable to update user or maybe user not found");
                res.status(200).json(response);
            }

        } catch (err) {
            response = createError(errorCodesEnum.INTERNAL_SERVER_ERROR, "Whoops something went wrong");
            res.status(200).json(response);
        }

    },
    delete: async (req, res) => {
        try {
            const deleted = await Category.deleteOne({ _id: req.params.id });
            res.json(deleted)
        } catch (err) {
            response = createError(errorCodesEnum.INTERNAL_SERVER_ERROR, "Whoops something went wrong");
            res.json(response);
        }


    }
}