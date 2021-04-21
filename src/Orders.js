import React from "react";
import "./Orders.css";
import { db } from "./firebase";
import { useState } from "react";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
	const [orders, setOrders] = useState([]);
	const [{ user }] = useStateValue();

	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user?.uid)
				.collection("orders")
				.orderBy("created", "desc")
				.get()
				.then((snapshot) => {
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
		<section className="orders">
			<h1>
				<center>{user ? "Your orders" : "Sign In to check your orders"}</center>
			</h1>
			{orders.map((order, index) => (
				<Order order={order} key={index} />
			))}
		</section>
	);
}

export default Orders;
