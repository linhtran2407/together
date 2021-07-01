const express = require ('express')
const router = express.Router()
const Couple = require('../models/Couple')
const Users = require('../models/User')

router.post('/', function (req, res) {

    const user = req.user
    const partnerName = req.body.partnerName

    Users.findOne({ userName: partnerName }, function (error, partner) {
        if (error) {
            return res.status(400).json({error: 'Partner not found'})
        } else {
            if (!partner) {
                return res.json( {error: 'Partner not found'} )
            }

            Couple.findOne( {'users._id': user._id}, function (error, couple) {
                if (couple) {
                    return res.json( {error: 'Lỗi nhân phẩm'})
                }
                Couple.findOne ( {'users._id': partner._id}, function (error, couple) {
                    if (couple) {
                        return res.json( {error: 'Đừng làm trà xanh'})
                    }

                    const cp = new Couple({
                        users: [user, partner],
                        startDate: Date.now(),
                        
                    })
                    cp.save(() => {
                        return res.json(cp)
                    })  
                })
            })
        }
    });
})


router.get('/', function (req, res) {
    const user = req.user
    Couple.findOne({'users._id': user._id}, function(error, couple) {
        if (error) {
            return res.status(400).json({error})
        } else {
            if (couple) {
                return res.json({ couple, user })
            }
            return res.json({error: 'Couple not found'})
        }
    }) 
})


module.exports = router