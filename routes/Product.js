const express = require('express')
const router = express.Router()
const controller = require('../controllers/ProductController')
const { validationSchemas } = require("../utils/Helpers")
const validator = require('express-joi-validation').createValidator({
    passError: true
})
const passport = require("passport")

router.get("/", controller.getAll)
router.post("/", validator.body(validationSchemas.addProductSchema),controller.create);
router.post("/:id", passport.authenticate("jwt",   {session: false}), controller.update);
router.delete("/:id", passport.authenticate("jwt",   {session: false}), controller.delete);

module.exports = router

