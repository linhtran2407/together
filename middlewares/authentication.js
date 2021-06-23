const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')

module.exports = (req, res, next) => {

    let token = req.cookies.token

    if (!token) {
        return res.redirect('/signin')
    }

    jwt.verify(token, config.private_key, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized!"
            })
        }

        req.user = decoded

        next()
    });
}