import React, { useState, useEffect, Suspense } from "react";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import { useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../axios";
const CheckoutProduct = React.lazy(() => import("./CheckoutProduct"));

function Payment() {
	const history = useHistory();
	const [{ basket, user }, dispatch] = useStateValue();

	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [clientSecret, setClientSecret] = useState(true);
	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		if (basket.length < 1) {
			setError("Add some items to the basket");
		}
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
		};
		getClientSecret();
	}, [basket]);
	const handleSubmit = async (event) => {
		event.preventDefault();
		setProcessing(true);

		await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				let eta;
				const order = async () => {
					await db
						.collection("users")
						.doc(user?.uid)
						.collection("orders")
						.doc(paymentIntent.id)
						.set({
							basket: basket,
							amount: paymentIntent.amount,
							created: paymentIntent.created,
						});
					if (basket[0].title === "Amazon Pro") {
						eta = 0;
					} else {
						eta = await db
							.collection("products")
							.orderBy("eta", "desc")
							.where(
								"title",
								"in",
								basket.map((item) => {
									return item.title;
								}),
							)
							.get()
							.then((snapshot) => {
								return snapshot.docs[0].data().eta;
							});
					}
				};
				order().then(() => {
					axios({
						method: "get",
						url: `/newOrder?uid=${user.uid}&orderId=${paymentIntent.id}&eta=${eta}`,
					});
				});
				setSucceeded(true);
				setError(null);
				setProcessing(false);
				dispatch({
					type: "CLEAR_BASKET",
				});
				history.replace("/orders");
			});
		const setPro = async () => {
			if (user) {
				await axios({
					method: "post",
					url: `/setPro?uid=${user.uid}`,
				});
			}
		};
		if (basket[0].title === "Amazon Pro") {
			setPro();
		}
	};

	const handleChange = (event) => {
		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
	};

	return (
		<section className="payment">
			<main className="payment__container">
				<h1>
					Checkout (<Link to="/checkout">{basket?.length} items</Link>)
				</h1>
				<div className="payment__section">
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment__address">
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>New Delhi, India</p>
					</div>
				</div>
				<section className="payment__section">
					<div className="payment__title">
						<h3>Review items and delivery</h3>
					</div>
					<div className="payment__items">
						<Suspense fallback={<div>Loading...</div>}>
							{basket.map((item) => (
								<CheckoutProduct
									key={item.id}
									id={item.id}
									image={item.image}
									title={item.title}
									price={item.price}
									rating={item.rating}
									quantity={item.quantity}
									hideButton={item.hideButton}
								/>
							))}
						</Suspense>
					</div>
				</section>
				<section className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>
					<article className="payment__details">
						<form onSubmit={handleSubmit}>
							<div className="price__container">
								<div className="cardEntry">
									<CardElement onChange={handleChange} />
								</div>
								<CurrencyFormat
									renderText={(value) => (
										<p>
											<strong>Order Total: {value}</strong>
										</p>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType="text"
									thousandSeparator={true}
									prefix={"₹"}
								></CurrencyFormat>
								<button
									disabled={
										!user ||
										basket.length < 1 ||
										processing ||
										error ||
										disabled ||
										succeeded
									}
									className="btn"
								>
									<span>{processing ? <p>Processing</p> : "Buy Now"}</span>
								</button>
							</div>
							{error && (
								<p
									style={{
										color: "red",
										fontWeight: "bold",
									}}
								>
									{error}
								</p>
							)}
						</form>
					</article>
				</section>
			</main>
		</section>
	);
}

export default Payment;
