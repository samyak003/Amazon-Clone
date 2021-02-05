import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
	return (
		<div className="order">
			<h1>
				<center>
					<strong>Order</strong>
				</center>
			</h1>
			<div className="order__details">
				<p>
					<strong>Time : </strong>
					{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
				</p>
				<p>
					<strong>Order id:</strong> {order.id}
				</p>
			</div>
			<hr />
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
			<hr />
			<div className="order__footer">
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
			</div>
		</div>
	);
}

export default Order;
