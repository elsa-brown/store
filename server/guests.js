'use strict'

const db = require('APP/db')
const Guest = db.model('guests')
const Order = db.model('order')

module.exports = require('express').Router()
  .post('/', (req, res, next) => {
    const guest = req.body.guestEntry
    const orderId = +req.body.orderId
    Guest.create(guest)
    .then(guest => guest.setOrder(orderId))
    .then(() => res.sendStatus(201))
    .catch(next)
  })
  .get('/:orderId', (req, res, next) => {
    Guest.findOne({
      where: { order_id: +req.params.orderId }
    })
    .then(guestInfo =>
      res.send(guestInfo)
    )
    .catch(next)
  })
