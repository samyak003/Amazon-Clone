import React, { lazy, Suspense } from "react";
import { db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react";
import { useStateValue } from "../StateProvider";
const Order = lazy(() => import("./Order"));

function Orders() {
	const [orders, setOrders] = useState([]);
	const [{ user }] = useStateValue();

	useEffect(() => {
		const getOrders = () => {
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
		};
		return getOrders();
	}, [user]);
	return (
		<section className="orders">
			<h1>
				<center>{user ? "Your orders" : "Sign In to check your orders"}</center>
			</h1>
			{orders.map((order, index) => (
				<Suspense fallback={<div>Loading</div>}>
					<Order order={order} key={index} />
				</Suspense>
			))}
		</section>
	);
}

export default Orders;
