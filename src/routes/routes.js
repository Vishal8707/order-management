const express = require('express')
const {userRegister, userLogin} = require("../Controllers/userController")
const { createOrder, getOrder } = require("../Controllers/orderController")
const {isAuthenticated} = require("../middleware/Auth")

const router = express.Router()

router.get('/test-me', function (req, res) {
    res.send({ test: "Test-API" })
})


router.post('/add-user', userRegister)
router.post('/login-user', userLogin)
router.post('/add-order',isAuthenticated, createOrder)
router.get('/get-order',isAuthenticated ,getOrder)





router.all("/*", function (req, res) { res.status(404).send({ status: false, msg: "Invalid HTTP request" }) })


module.exports = router