import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { db, auth } from "../firebase";
import MenuIcon from "@material-ui/icons/Menu";
import Sidebar from "./Sidebar";

function Header() {
	const [{ basket, user }] = useStateValue();
	const [proUser, setProUser] = useState(false);
	const handleAuthentiction = () => {
		if (user) {
			auth.signOut();
		}
	};
	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user?.uid)
				.onSnapshot((snapshot) => {
					if (snapshot.data()) {
						setProUser(snapshot.data().pro);
					}
				});
		}
	}, [user]);
	return (
		<header className="header">
			<section className="header__left">
				<MenuIcon
					className="header__menuBtn"
					onClick={() => {
						document.querySelector(".sidebar").classList.toggle("open");
					}}
				/>
				<Link to="/">
					<img
						src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
						alt="logo"
						className="header__logo"
					/>
				</Link>
				<div className="header__search">
					<input className="header__searchInput" type="text"></input>
					<SearchIcon className="header__searchIcon"></SearchIcon>
				</div>
			</section>
			<nav className="header__nav">
				<Link to={user ? "/" : "/login"}>
					<div onClick={handleAuthentiction} className="header__option">
						<span className="header__optionLineOne">
							Hello, {user ? user.displayName || user.email : "Guest"}
						</span>
						<span className="header__optionLineTwo">
							{user ? "Sign Out" : "Sign In"}
						</span>
					</div>
				</Link>
				<Link to="/orders">
					<div className="header__option">
						<span className="header__optionLineOne">Returns</span>
						<span className="header__optionLineTwo">& Orders</span>
					</div>
				</Link>
				<a href="https://github.com/samyak003/Amazon-Clone">
					<div className="header__option">
						<span className="header__optionLineOne">Github</span>
						<span className="header__optionLineTwo">Repo</span>
					</div>
				</a>
				{!proUser ? (
					<Link to="/pro">
						<div className="header__option">
							<span className="header__optionLineOne">Upgrade To</span>
							<span className="header__optionLineTwo">Pro</span>
						</div>
					</Link>
				) : (
					<></>
				)}
				<Link to="/checkout">
					<div className="header__optionBasket">
						<ShoppingBasketIcon />
						<span className="header__optionLineTwo header__basketCount">
							{basket?.length}
						</span>
					</div>
				</Link>
			</nav>
			<Sidebar />
		</header>
	);
}

export default Header;
