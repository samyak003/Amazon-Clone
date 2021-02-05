import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
function Checkout() {
	const [{ basket, user }, dispatch] = useStateValue();
	return (
		<div className="checkout">
			<div className="checkout__left">
				<img
					className="checkout__ad"
					src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
					alt="advertisment"
				></img>
				<div>
					<h3>Hello, {user ? user?.displayName || user?.email : "Guest"}</h3>
					<h2 className="checkout__title">
						{basket.length === 0
							? "Your basket seems empty add something to it"
							: "Your Shopping Basket"}
					</h2>
					<div>
						{basket.map((item) => {
							return (
								<CheckoutProduct
									key={item.id}
									id={item.id}
									image={item.image}
									title={item.title}
									price={item.price}
									rating={item.rating}
									quantity={item.quantity}
								></CheckoutProduct>
							);
						})}
					</div>
				</div>
			</div>
			<div className="checkout__right">
				<Subtotal />
			</div>
		</div>
	);
}

export default Checkout;
