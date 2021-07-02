const express = require('express')
const Couple = require('../models/Couple')
const Diary = require('../models/Diary')
const router = express.Router()

router.post('/', function (req, res) {
    const user = req.user
    
    Couple.findOne({'users._id' : user._id}, function (error, couple){
        if (error || !couple) {
            return res.status(400).json({error : 'Couple not found'})
        }

        const diary = new Diary({
            couple_id: couple._id,
            user: {
                user_id: user._id,
                userName: user.userName,
            },
            content: req.body.content
        })

        diary.save(() => {
            return res.json(diary)    
        })
    })
})

router.get('/', function (req, res) {
    const user = req.user
    const limit = req.query.limit || 5
    const offset = req.query.offset || 0

    Couple.findOne({'users._id': user._id}, function(error, couple){
        if (error || !couple) {
            return res.status(400).json({error: 'Couple not found'})
        }
        
        Diary.find({'couple_id': couple._id}, function(error, diary){
            if (error){
                return res.status(400).json({error: 'Diary not found'})
            }
            
            return res.json(diary)
        }).sort({ createdAt: -1 }).limit(limit).skip(offset)
    })
})

// router.delete('/:_id', function (req, res) {
//     const _id = req.params._id

//     const sample_diary = [
//         {
//             id: '1',
//             title: 'today'
//         },
//         {
//             id: '2',
//             title: 'tomorrow'
//         }
//     ]

//     const dr = sample_diary.find(dr => dr.id === _id)

//     return res.send(`Delete diary: ${dr.title}`)
// })

// router.put('/:_id', function (req, res) {
//     const _id = req.params._id

//     const sample_diary = [
//         {
//             id: '1',
//             title: 'today'
//         },
//         {
//             id: '2',
//             title: 'tomorrow'
//         }
//     ]

//     const dr = sample_diary.find(dr => dr.id === _id)

//     return res.send(`Put diary: ${dr.title}`)
// })


module.exports = router