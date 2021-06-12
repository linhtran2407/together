const express = require('express')

const router = express.Router()

router.post('/', function (req, res) {
    return res.json(req.body)
})

router.delete('/:_id', function (req, res) {
    const _id = req.params._id

    const sample_diaries = [
        {
            id: '1',
            title: 'today'
        },
        {
            id: '2',
            title: 'tomorrow'
        }
    ]

    const dr = sample_diaries.find(dr => dr.id === _id)

    return res.send(`Delete diaries: ${dr.title}`)
})

router.get('/:_id', function (req, res) {
    const _id = req.params._id

    const sample_diaries = [
        {
            id: '1',
            title: 'today'
        },
        {
            id: '2',
            title: 'tomorrow'
        }
    ]

    const dr = sample_diaries.find(dr => dr.id === _id)

    return res.send(`Get diaries: ${dr.title}`)
})

router.put('/:_id', function (req, res) {
    const _id = req.params._id

    const sample_diaries = [
        {
            id: '1',
            title: 'today'
        },
        {
            id: '2',
            title: 'tomorrow'
        }
    ]

    const dr = sample_diaries.find(dr => dr.id === _id)

    return res.send(`Put diaries: ${dr.title}`)
})


module.exports = router