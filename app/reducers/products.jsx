import axios from 'axios'

const reducer = (state = [], action) => {
  
  switch (action.type) {
  case GET_PRODUCTS:
    return action.products;
  }

  return state;
}

// Products constants
const GET_PRODUCTS = 'GET_PRODUCTS'

// Products action creators
export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

// Dispatchers
export const fetchProducts = () => 
  dispatch => 
    axios.get(`/api/products`)
      .then(response => {
        dispatch(getProducts(response.data))})
      .catch(err => console.error(err))

export default reducer
