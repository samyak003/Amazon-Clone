export const initialState = {
	basket: [],
	user: null,
	products: [],
	allProducts: [],
};

export const getBasketTotal = (basket) => {
	return basket?.reduce(
		(amount, item) => item.price * item.quantity + amount,
		0,
	);
};

const reducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_BASKET":
			const ids = state.basket.findIndex(
				(basketItem) => basketItem.id === action.item.id,
			);
			if (state.basket.length === 1) {
				if (state.basket[0].title === "Amazon Pro") {
					return {
						...state,
						basket: [...state.basket],
					};
				}
			}
			if (ids >= 0) {
				state.basket[ids].quantity++;
			} else {
				action.item.quantity = 1;
				return {
					...state,
					basket: [...state.basket, action.item],
				};
			}
			return {
				...state,
				basket: [...state.basket],
			};
		case "CLEAR_BASKET":
			return {
				...state,
				basket: [],
			};
		case "REMOVE_FROM_BASKET":
			const index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id,
			);
			let newBasket = [...state.basket];
			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.warn(
					`Can't remove product (id : ${action.id}) as its not in basket!`,
				);
			}
			return {
				...state,
				basket: newBasket,
			};
		case "DECREASE_QUANTITY":
			const productToBeRemoved = state.basket.findIndex(
				(basketItem) => basketItem.id === action.item.id,
			);
			if (state.basket[productToBeRemoved].quantity >= 2) {
				state.basket[productToBeRemoved].quantity--;
			} else {
				state.basket.splice(productToBeRemoved, 1);
			}
			return {
				...state,
				basket: [...state.basket],
			};
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};
		case "SET_PRODUCTS":
			return {
				...state,
				products:
					action.products.length === 0 ? action.allProducts : action.products,
			};
		case "SET_ALLPRODUCTS":
			return {
				...state,
				allProducts: action.allProducts,
				products: action.allProducts,
			};
		default:
			return state;
	}
};

export default reducer;
