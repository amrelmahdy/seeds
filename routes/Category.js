const express = require('express')
const router = express.Router()
const controller = require('../controllers/CategoryController')
const { validationSchemas } = require("../utils/Helpers")
const validator = require('express-joi-validation').createValidator({
    passError: true
})
const passport = require("passport")




router.get("/", validator.body(validationSchemas.registerSchema), controller.getAll)
router.post("/", validator.body(validationSchemas.loginSchema),controller.create);
router.post("/update", passport.authenticate("jwt",   {session: false}), controller.update);
router.delete("/delete", passport.authenticate("jwt",   {session: false}), controller.delete);

module.exports = router

