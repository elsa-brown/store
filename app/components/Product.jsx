import React from 'react'
import { Link } from 'react-router'
import { fetchCart, changeItemQuantity, itemIncrement } from 'APP/app/reducers/cart'
import store from 'APP/app/store'

const fake = {
  description: 'This tomato is bright red when ripe. The average weight is 50 grams, with a flavonoid content of 100 mg/gm. '
}

const Product = (product = {}) => {
  function onClick() {
    store.dispatch(itemIncrement(product.id))
  }

  return (
          <div className="jumbotron product-view">
            <h1>{ product.name }</h1>
            <div className="col-xs-6">
              <img className="product-view-image" src={ product.imageURL } />
            </div>
            <div className="col-xs-6 product-info">
              <p>Price: ${product.price}</p>
              {
                product.inventory < 5 ? (
                  <p>Remaining stock is only... {product.inventory}</p>
                ) : (
                  <p>Stock: {product.inventory}</p>
                )
              }
              <p className="product-desc">Description: {fake.description}</p>
              <p><a className="btn btn-primary btn-lg" onClick= { onClick }>Add To Cart</a></p>
            </div>
          </div>
  )
}

export default Product
