const Category = require('../models/Category')
const { createError } = require('../utils/Helpers')
const { errorCodesEnum, jwt_secret } = require('../Config')



module.exports = {
    getAll: async (req, res, next) => {
        res.json({
            key: 'all'
        })
    },
    create: async (req, res, next) => {
        res.json({
            key: 'create'
        })
    },
    update: async (req, res, next) => {
        res.json({
            key: 'update'
        })
    },
    delete: async (req, res, next) => {
        res.json({
            key: 'delete'
        })
    }
}