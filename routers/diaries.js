const express = require('express')
const Couple = require('../models/Couple')
const Diary = require('../models/Diaries')
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

    Couple.findOne({'users._id': user._id}, function(error, couple){
        if (error || !couple) {
            return res.status(400).json({error: 'Couple not found'})
        }
        
        Diary.find({'couple_id': couple._id}, function(error, diaries){
            if (error){
                return res.status(400).json({error: 'Diaries not found'})
            }
            
            return res.json(diaries)
        }).sort({ createdAt: -1 }).limit(2).skip(2)
    })
})

// router.delete('/:_id', function (req, res) {
//     const _id = req.params._id

//     const sample_diaries = [
//         {
//             id: '1',
//             title: 'today'
//         },
//         {
//             id: '2',
//             title: 'tomorrow'
//         }
//     ]

//     const dr = sample_diaries.find(dr => dr.id === _id)

//     return res.send(`Delete diaries: ${dr.title}`)
// })

// router.put('/:_id', function (req, res) {
//     const _id = req.params._id

//     const sample_diaries = [
//         {
//             id: '1',
//             title: 'today'
//         },
//         {
//             id: '2',
//             title: 'tomorrow'
//         }
//     ]

//     const dr = sample_diaries.find(dr => dr.id === _id)

//     return res.send(`Put diaries: ${dr.title}`)
// })


module.exports = router