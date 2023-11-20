const Category = require('../models/Category')
const { createError } = require('../utils/Helpers')
const { errorCodesEnum } = require('../Config')



module.exports = {
    getAll: async (req, res) => {
        try {
            const categories = await Category.find({ parent: { $exists: false } }).populate('sub_categories products')
            res.json(categories)
        } catch (err) {
            console.log(err)
            response = createError(errorCodesEnum.INTERNAL_SERVER_ERROR, "Whoops something went wrong");
            res.json(response)
        }
    },
    create: async (req, res,) => {
        try {
            const newCategory = Category(req.body);
            if (req.body.parent) {
                await Category.updateOne(
                    { _id: req.body.parent },
                    { $push: { sub_categories: newCategory.id } }
                );
            }
            newCategory.save()
            res.json(newCategory)
        } catch (err) {
            response = createError(errorCodesEnum.INTERNAL_SERVER_ERROR, "Whoops something went wrong");
            res.json(response);
        }
    },
    update: async (req, res) => {
        try {
            const updated = await Category.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { ...req.body } },
                { new: true }
            );
            if (updated) {
                const parentID = updated?.parent
                if (!req.body.parent) {
                    // Unset the parent field in a separate operation
                    await Category.updateOne(
                        { _id: req.params.id },
                        { $unset: { parent: 1 } }
                    );
                    // Remove the category from the sub_categories array of its parent category
                    await Category.updateOne(
                        { _id: parentID },
                        { $pull: { sub_categories: updated.id } }
                    );
                } else {

                    await Category.updateOne(
                        { _id: parentID },
                        { $push: { sub_categories: updated.id } }
                    );
                }
                res.json(updated);
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
            const deleted = await Category.deleteOne({ _id: req.params.id });
            res.json(deleted)
        } catch (err) {
            response = createError(errorCodesEnum.INTERNAL_SERVER_ERROR, "Whoops something went wrong");
            res.json(response);
        }


    }
}