'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import axios from 'axios'

import store from './store'
import { fetchProducts } from './reducers/products'
import { fetchProduct } from './reducers/product'
import { fetchCart } from './reducers/cart'
import { fetchOrder } from './reducers/receipt'

import AppContainer from './containers/AppContainer'
import ProductsContainer from './containers/ProductsContainer'
import ProductContainer from './containers/ProductContainer'
import CartContainer from './containers/CartContainer'
import CheckoutContainer from './containers/CheckoutContainer'
import ReceiptContainer from './containers/ReceiptContainer'
import SignUpContainer from './containers/SignUpContainer'
import PayPalContainer from './containers/PayPalContainer'

import NotFound from './components/NotFound'
import Navbar from './components/Navbar'
import LoginSignup from './components/LoginSignup'

// onEnter takes three arguments in order to prevent route rendering until onEnter has finished. This prevents you from hitting an incomplete state during route render.
const onProductsEnter = (nextRouterState, _, done) => {
  store.dispatch(fetchProducts())
  .then(done)
}

const onProductEnter = (nextRouterState, _, done) => {
  store.dispatch(fetchProduct(nextRouterState.params.id))
    .then(done)
}

// we deleted _ and done from the arguments and didnt use .then(done) after the dispatch because it would not work. Error was dispatch is not a function so we cant call .then off of it. Unsure why this is happening, will come back to...maybe.
const onCartEnter = (nextRouterState) => {
  store.dispatch(fetchCart())
}

const onReceiptEnter = (nextRouterState, _, done) => {
  // console.log('in on receipt enter', nextRouterState) // works
  store.dispatch(fetchOrder(nextRouterState.params.orderId))
  .then(done)
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} >
        <IndexRedirect to="/products" />
        <Route path="/products" component={ProductsContainer} onEnter={onProductsEnter} />
        <Route path="/products/:id" component={ProductContainer} onEnter={onProductEnter} />
        <Route path="/cart" component={CartContainer} onEnter={onCartEnter} />
        <Route path="/checkout" component={CheckoutContainer} />
        <Route path="/paypal/:orderId" component={PayPalContainer} />
        <Route path="/login" component={LoginSignup} />
        <Route path="/receipt/:orderId" component={ReceiptContainer} onEnter={onReceiptEnter} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
