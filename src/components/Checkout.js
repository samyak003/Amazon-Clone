import React, { lazy, Suspense } from "react";
import { useStateValue } from "../StateProvider";

const Subtotal = lazy(() => import("./Subtotal"));
const CheckoutProduct = React.lazy(() => import("./CheckoutProduct"));

function Checkout() {
	const [{ basket, user }] = useStateValue();
	return (
		<section className="checkout">
			<section className="checkout__left">
				<img
					className="checkout__ad"
					src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
					alt="advertisment"
				></img>
				<article>
					<h3>Hello, {user ? user?.displayName || user?.email : "Guest"}</h3>
					<h2 className="checkout__title">
						{basket.length === 0
							? "Your basket seems empty add something to it"
							: "Your Shopping Basket"}
					</h2>
					<div>
						<Suspense fallback={<div>Loading...</div>}>
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
						</Suspense>
					</div>
				</article>
			</section>
			<div className="checkout__right">
				<Suspense fallback={<div>Loading...</div>}>
					<Subtotal />
				</Suspense>
			</div>
		</section>
	);
}

export default Checkout;
