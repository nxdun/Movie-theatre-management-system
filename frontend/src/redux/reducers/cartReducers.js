import  * as actionTypes from '../constants/cartConstants';


export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type){
        case actionTypes.ADD_TO_CART:
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x.product === item.product);

            if(existItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x),
                };//if item exist in the cart update the item
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };//if the item is  not found in the  array add item to the array
            }
            case actionTypes.REMOVE_FROM_CART:
                return {
                    ...state,
                    cartItems: state.cartItems.filter((x) => x.product !== action.payload),
                }//if item exist in the cart remove the item

        default:
            return state;
    }
};