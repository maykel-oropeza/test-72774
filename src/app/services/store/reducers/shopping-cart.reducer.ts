import * as shopingCart from '../actions/shoping-cart.actions';

export function shopingCartReducer(state: any = [], action: shopingCart.ShoppingCartActions): any {
 
  state = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : [];
  
  switch (action.type) {
    case shopingCart.ShoppingCartActionTypes.LOAD_SHOPPING_CART: {
      return Object.assign([], state, action.payload);
    };
    case shopingCart.ShoppingCartActionTypes.SHOPPING_CART_ADD_PRODUCT: {
      return [...state, action.payload];
    };
    case shopingCart.ShoppingCartActionTypes.SHOPPING_CART_UPDATE: {
      let stateTmp;
      if(!state.find((product) => product.id === action.payload.id)){
        stateTmp = [...state, action.payload];
      }else{
        stateTmp = Object.assign([], state,
          state.map(product => {
            if (product.id !== action.payload.id) {
              return product
            }
            return product = action.payload
          })
        )
      }
      localStorage.setItem('shoppingCart', JSON.stringify(stateTmp));
      return stateTmp;
    };
    case shopingCart.ShoppingCartActionTypes.SHOPPING_CART_REMOVE_PRODUCT: {
      let stateTmp =  state.filter((p) => { 
        return p.id !== action.payload.id
      });
      
      localStorage.setItem('shoppingCart', JSON.stringify(stateTmp))
      return  [...stateTmp];
    };
    default:
      return state;
  }

  let locaStorageManagement = (state) => {
     localStorage.setItem('shoppingCart', JSON.stringify(state));
     return state;
  }
}