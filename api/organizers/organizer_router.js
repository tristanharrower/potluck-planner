const express = require('express')

const router = express.Router();

const Organizer = require('./organizers_model')



//get all organizers
router.get('/', (req, res, next) => {
    Organizer.getAllOrganizers()
    .then(list => {
        res.status(200).json(list)
    })
    .catch(err => {
        next(err)
    })
  })


  //create a new organizer
  router.post('/', async (req, res, next) => {
      const newOrganizer = {
          username:req.body.username,
          password:req.body.password
      }
     Organizer.insertOrganizer(newOrganizer)
     .then(org => {
         res.status(201).json(org)
     })
     .catch(err => {
         next(err)
     })
  })

  router.delete('/:id', async (req, res, next) => {
    Organizer.deleteById(req.params.id)
    .then(() => {
        res.status(200).json('Organizer successfully deleted')
    })
    .catch(err => {
        next(err)
    })
})



module.exports = router