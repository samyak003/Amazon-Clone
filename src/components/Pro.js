import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";
function Pro() {
	const history = useHistory();
	const [{ user }, dispatch] = useStateValue();
	const [pro, setPro] = useState(false);
	useEffect(() => {
		const unsubscribe = () => {
			if (user) {
				db.collection("users")
					.doc(user?.uid)
					.onSnapshot((snapshot) => {
						setPro(snapshot.data()?.pro);
					});
			}
		};
		return unsubscribe();
	}, [user]);
	useEffect(() => {
		if (pro) {
			history.replace("/");
		}
	}, [pro, history]);
	const joinPrime = () => {
		dispatch({
			type: "CLEAR_BASKET",
		});
		dispatch({
			type: "ADD_TO_BASKET",
			item: {
				title: "Amazon Pro",
				image: "https://pngimg.com/uploads/amazon/amazon_PNG11.png",
				price: 129,
				rating: 5,
				hideButton: true,
			},
		});
		history.replace("/payment");
	};
	return (
		<section className="pro">
			<ul>
				<li>Get access to exclusive themes.</li>
				<li>Get faster deliveries.</li>
			</ul>
			<div className="pro__joinBox">
				<button
					onClick={joinPrime}
					className="login__signInButton"
					style={{ width: "inherit" }}
				>
					Join Prime{" "}
				</button>
			</div>
		</section>
	);
}

export default Pro;
