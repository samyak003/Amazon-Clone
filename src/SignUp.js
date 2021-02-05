import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./SignUp.css";
import { auth } from "./firebase";

function SignUp() {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const register = (event) => {
		event.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((auth) => {
				if (auth) {
					auth.user.updateProfile({
						displayName: name,
					});
					history.push("/");
				}
			})
			.catch((error) => setError(error.message));
	};
	return (
		<div className="signUp">
			<Link to="/">
				<img
					className="signUp__logo"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
					alt="banner"
				></img>
			</Link>
			<div className="signUp__container">
				<h1>Sign-Up</h1>
				<form>
					<h5>Name</h5>
					<input
						type="text"
						onChange={(e) => setName(e.target.value)}
						value={name}
					></input>
					<h5>E-mail</h5>
					<input
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					></input>
					<h5>Password</h5>
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					></input>
				</form>
				<p className="signUp__error">{error}</p>
				<button
					disabled={!name || !email || !password}
					onClick={register}
					className="signUp__registerButton"
				>
					Create Your Amazon Account
				</button>
				<p>
					By signing-up you agree to Amazon-Fake-Clone's Conditions of Use &
					Sale. Please see our Privacy Notice, our Cookies Notice and our
					Interest-Based Ads Notice.
				</p>
				<button
					onClick={() => history.push("/login")}
					className="signUp__loginButton"
				>
					Sign-In
				</button>
			</div>
		</div>
	);
}

export default SignUp;
