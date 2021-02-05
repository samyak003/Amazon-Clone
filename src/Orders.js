import React from "react";
import "./Orders.css";
import { db } from "./firebase";
import { useState } from "react";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
	const [orders, setOrders] = useState([]);
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user?.uid)
				.collection("orders")
				.orderBy("created", "desc")
				.onSnapshot((snapshot) => {
					setOrders(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						})),
					);
				});
		}
	});
	return (
		<div className="orders">
			<h1>
				<center>{user ? "Your orders" : "Sign In to check your orders"}</center>
			</h1>
			{orders.map((order, index) => (
				<Order order={order} key={index} />
			))}
		</div>
	);
}

export default Orders;
