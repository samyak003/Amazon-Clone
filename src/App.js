import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import ProductPage from "./ProductPage";
import Payment from "./Payment";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Orders from "./Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SignUp from "./SignUp";
import Pro from "./Pro";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function App() {
	const [, dispatch] = useStateValue();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, [dispatch]);
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/pro">
						<Header />
						<Pro />
					</Route>
					<Route path="/checkout">
						<Header />
						<Checkout />
					</Route>
					<Route path="/signUp">
						<SignUp />
					</Route>
					<Route path="/orders">
						<Header />
						<Orders />
					</Route>
					<Route path="/product/:productId">
						<Header />
						<ProductPage />
					</Route>
					<Route path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
