import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import CurrencyFormat from "react-currency-format";

function Product({ id, title, image, price, rating, index }) {
	const [, dispatch] = useStateValue();

	const addToBasket = () => {
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

	return (
		<section className="product">
			<Link to={`/product/${id}`}>
				<main className="product__details">
					<div className="product__info">
						<p>{title}</p>
						<CurrencyFormat
							renderText={(value) => (
								<p className="product__price">
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
						<div className="product__rating">
							{Array(rating)
								.fill()
								.map((_, i) => (
									<span aria-label="rating" role="img" key={i}>
										⭐
									</span>
								))}
						</div>
					</div>
					<img src={image} alt="Product" />
				</main>
			</Link>
			<center>
				<button className="product__addBtn" onClick={addToBasket}>
					Add to Basket
				</button>
			</center>
		</section>
	);
}

export default Product;
