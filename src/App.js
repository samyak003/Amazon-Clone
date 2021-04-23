import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./components/Home"));
const Checkout = lazy(() => import("./components/Checkout"));
const ProductPage = lazy(() => import("./components/ProductPage"));
const Payment = lazy(() => import("./components/Payment"));
const Login = lazy(() => import("./components/Login"));
const Orders = lazy(() => import("./components/Orders"));
const SignUp = lazy(() => import("./components/SignUp"));
const Pro = lazy(() => import("./components/Pro"));

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
				<Suspense fallback={<div>Loading...</div>}>
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
				</Suspense>
			</div>
		</Router>
	);
}

export default App;
