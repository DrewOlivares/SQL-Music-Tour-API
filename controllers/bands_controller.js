// Dependencies
const bands = require('express').Router()
const db = require('../models')
const { Band, Meet_greet, Event, Set_time } = db
const { Op } = require('sequelize')

// Routes

// Show
bands.get('/', async (req, res)=> {
    try{
        const foundBands= await Band.findAll({
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            },
            order: [ ['available_start_time', "ASC"] ]
        })
        res.status(200).json(foundBands)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message:'Server Error!'})
    }
})

bands.get('/:name', async (req, res)=>{
    try{
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include: [{
                model: Meet_greet,
                as: 'meet_greets',
                include: {
                    model: Event,
                    as: 'event',
                    where: {
                        name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` }
                    }
                }
                },
                {
                    model: Set_time,
                    as: 'set_times',
                    include: {
                        model: Event,
                        as: 'event',
                        where: {
                            name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` }
                        }
                    }
                    
                }
            ]
        })
        res.status(200).json(foundBand)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message:'Server Error!'})
    }
})

// Create
bands.post('/', async (req, res)=>{
    try{
        const newBand= await  Band.create(req.body)
        res.status(200).json(newBand)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message:'Server Error!'})
    }
})

// Update
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } 
    catch(err) {
        res.status(500).json(err)
    }
})

// Delete
bands.delete('/:id', async (req, res)=>{
    try{
    const deletedBands = await Band.destroy({
        where: {band_id: req.params.id}
    })
    res.status(200).json({ message:`${deletedBands} band(s) deleted`})
}
    catch(err) {
        res.status(500).json(err)
    }
})

// Export
module.exports = bands