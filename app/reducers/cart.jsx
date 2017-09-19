import axios from 'axios'
import Promise from 'bluebird'

const initialState = {
  list: [], // cart.list is array of products in cart
  orderId: 0,
  size: 0
}

// Cart reducer
const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
  case GOT_CART:
    newState.list = action.cart
    break

  case GOT_ORDER_ID:
    newState.orderId = action.orderId
    break

  case GOT_CART_SIZE:
    newState.size = action.size
    break

  case CLEARED_CART:
    newState.size = action.size
    break
  }

  return newState
}

// Cart constants
const GOT_CART = 'GOT_CART'
const GOT_ORDER_ID = 'GOT_ORDER_ID'
const GOT_CART_SIZE = 'GOT_CART_SIZE'
const CLEARED_CART = 'CLEARED_CART'

// Cart action creators
export const gotCart = cart => ({
  type: GOT_CART,
  cart
})

export const gotOrderId = orderId => ({
  type: GOT_ORDER_ID,
  orderId
})

// sets cart size on state
export const gotCartSize = size => ({
  type: GOT_CART_SIZE,
  size
})
// clears localStorage cart (to "")
export const clearedCart = () => ({
  type: CLEARED_CART,
  size: 0
})

// Cart thunk creators
export const itemIncrement = (productId) =>
  dispatch => {
    const cart = getCartLocal()
    !cart[productId] ? cart[productId] = 1 : cart[productId]++
    setCartLocal(cart)
    dispatch(fetchCart())
  }

export const itemDecrement = (productId) =>
  dispatch => {
    const cart = getCartLocal()
    !cart[productId] ? cart[productId] = 0 : cart[productId]--
    if (cart[productId] < 1) delete cart[productId]
    setCartLocal(cart)
    dispatch(fetchCart())
  }

export const removeItem = (productId) =>
  dispatch => {
    const cart = getCartLocal()
    delete cart[productId]
    setCartLocal(cart)
    dispatch(fetchCart())
  }

export const getCartSize = () =>
  dispatch => {
    const cart = getCartLocal()
    let cartSize = 0

    for (var productId in cart) {
      cartSize += cart[productId]
    }
    dispatch(gotCartSize(cartSize))
  }

export const fetchCart = () =>
  dispatch => {
    const localCart = getCartLocal()
    const localCartKeys = Object.keys(localCart)

    Promise.map(localCartKeys, key => {
      return axios.get(`/api/products/${key}`)
    })
      .then(products => {
        return products.map(product => product.data)
      })
      .then(products => {
        // formats each product object for cart local storage
        return products.map(product => ({quantity: localCart[product.id], product}))
      })
      .then(formattedCart => {
        dispatch(gotCart(formattedCart))
        dispatch(getCartSize())
      })
      .catch(err => console.error(err))
  }

export const checkoutCart = (cart, userId) =>
  dispatch => {
    axios.post('api/orders', { cart, userId })
    .then((res) => {
      const orderId = res.data[0].order_id
      dispatch(gotOrderId(orderId))
    })
    .catch(err => console.error(err))
  }

export const clearCart = () =>
  dispatch => {
    window.localStorage.cart = ''
    dispatch(clearedCart())
  }

export default reducer

// localStorage helper functions
const localStorage = window.localStorage

const getCartLocal = function() {
  if (localStorage.cart) {
    return JSON.parse(localStorage.cart)
  } else {
    return {}
  }
}

// accepts cart object in the form: {productId: productQty}
const setCartLocal = function(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}
