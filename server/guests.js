'use strict'

const db = require('APP/db')
const Guest = db.model('guests')

module.exports = require('express').Router()
  .post('/',
    (req, res, next) =>
      Guest.create(req.body)
      .then(guest => res.status(201).json(guest))
      .catch(next))
  // .get('/:id',
  //   (req, res, next) =>
  //     User.findById(req.params.id)
  //     .then(user => res.json(user))
  //     .catch(next))
  .get('/:orderId', (req, res, next) => {
    Guest.findOne({
      where: { order_id: +req.params.orderId }
    })
    .then(guestInfo =>
      res.send(guestInfo)
    )
    .catch(next)
  })
