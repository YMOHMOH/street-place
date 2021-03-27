import {
  ADD_TO_CART,
  REMOVE_ITEM_CART,
  CLEAR_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => {
        return i.product === item.product && i.size === item.size;
      });

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product && i.size === item.size ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => {
          if (
            i.product === action.payload.product &&
            i.size === action.payload.size
          ) {
            return false;
          }
          return true;
        }),
      };

    case CLEAR_CART:
      return {
        ...state,
        cartItems: action.payload,
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};
