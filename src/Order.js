import React, { useEffect } from "react";
import "./Order.css";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import { Suspense } from "react";
const CheckoutProduct = React.lazy(() => import("./CheckoutProduct"));

function Order({ order }) {
	useEffect(() => {
		const unsubscribe = () => {};
		return unsubscribe();
	}, []);
	return (
		<section className="order">
			<h1>
				<center>
					<strong>Order</strong>
				</center>
			</h1>
			<p>
				<strong>Status : </strong>
				{order.data.orderStatus?.replace(/^\w/, (c) => c.toUpperCase())}
			</p>
			<article className="order__details">
				<p>
					<strong>Time : </strong>
					{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
				</p>
				<p>
					<strong>Order id:</strong> {order.id}
				</p>
			</article>
			<hr />
			<Suspense fallback={<div>Loading...</div>}>
				{order.data.basket?.map((item) => (
					<CheckoutProduct
						id={item.id}
						title={item.title}
						price={item.price}
						rating={item.rating}
						image={item.image}
						quantity={item.quantity}
						hideButton
					/>
				))}
			</Suspense>
			<hr />
			<article className="order__footer">
				{order?.data.amount && (
					<CurrencyFormat
						renderText={(value) => (
							<p>
								<strong>Order Total:</strong> {value}
							</p>
						)}
						decimalScale={2}
						value={order.data.amount / 100}
						displayType="text"
						thousandSeparator={true}
						thousandSpacing="2s"
						prefix={"₹"}
					></CurrencyFormat>
				)}
			</article>
		</section>
	);
}

export default Order;
