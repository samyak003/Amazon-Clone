import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";

function CheckoutProduct({
	id,
	image,
	title,
	price,
	rating,
	quantity,
	hideButton,
}) {
	const [, dispatch] = useStateValue();
	const removeFromBasket = () => {
		// remove the item from the basket
		dispatch({
			type: "REMOVE_FROM_BASKET",
			id: id,
		});
	};
	const addToBakset = () => {
		// ADD the item to the basket
		dispatch({
			type: "ADD_TO_BASKET",
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
			},
		});
	};
	const decreaseQuantity = () => {
		// remove the item from the basket
		dispatch({
			type: "DECREASE_QUANTITY",
			item: {
				id: id,
				title: title,
				image: image,
				price: price,
				rating: rating,
			},
		});
	};
	return (
		<article className="checkoutProduct">
			<img className="checkoutProduct__image" alt="Product" src={image} />
			<main className="checkoutProduct__info">
				<p className="checkoutProduct__title">{title}</p>
				<CurrencyFormat
					renderText={(value) => (
						<p className="checkoutProduct__price">
							<strong>{value}</strong>
						</p>
					)}
					decimalScale={2}
					value={price}
					displayType="text"
					thousandSeparator={true}
					thousandSpacing="2s"
					prefix={"₹"}
				></CurrencyFormat>
				{!hideButton ? (
					<span>
						Quantity
						<button
							className="checkoutProduct__quantityChangeBtns"
							onClick={decreaseQuantity}
						>
							-
						</button>
						{quantity}
						<button
							className="checkoutProduct__quantityChangeBtns"
							onClick={addToBakset}
						>
							+
						</button>
					</span>
				) : (
					<span>Quantity: {quantity}</span>
				)}
				<div className="checkoutProduct__rating">
					{Array(rating)
						.fill()
						.map((_, i) => (
							<span aria-label="rating" role="img" key={i}>
								⭐
							</span>
						))}
				</div>
				{!hideButton && (
					<button className="btn" onClick={removeFromBasket}>
						Remove from basket
					</button>
				)}
			</main>
		</article>
	);
}

export default CheckoutProduct;
