// Rooted off of `/api/products`

'use strict'

const db = require('APP/db')
const Product = db.model('product')

module.exports = require('express').Router()
  .get('/', function(req, res, next) {
    Product.findAll(
      {order: 'name'})
      .then(products => res.send(products))
      .catch(next)
  })
  .get('/:id', function(req, res, next) {
    Product.findById(+req.params.id)
    .then(product => {
      res.send(product)
    })
    .catch(next)
  })
