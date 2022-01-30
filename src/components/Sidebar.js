import React, { useEffect, useState } from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";

function Sidebar() {
	const [{ basket, user }] = useStateValue();
	const [proUser, setProUser] = useState(false);
	const handleAuthentiction = () => {
		if (user) {
			auth.signOut();
		}
	};
	useEffect(() => {
		const getProUser = () => {
			if (user) {
				db.collection("users")
					.doc(user?.uid)
					.onSnapshot((snapshot) => {
						if (snapshot.data()) {
							setProUser(snapshot.data().pro);
						}
					});
			}
		};
		return getProUser();
	});
	const closeSidebar = () => {
		document.querySelector(".sidebar").classList.remove("open");
	};
	return (
		<section className="sidebar">
			<Link to={user ? "/" : "/login"} onClick={() => closeSidebar()}>
				<div onClick={handleAuthentiction} className="sidebar__option">
					<span className="sidebar__optionLineOne">
						Hello, {user ? user.displayName || user.email : "Guest"}
					</span>
					<span className="sidebar__optionLineTwo">
						{user ? "Sign Out" : "Sign In"}
					</span>
				</div>
			</Link>
			<Link to="/orders" onClick={() => closeSidebar()}>
				<div className="sidebar__option">
					<span className="sidebar__optionLineOne">Returns</span>
					<span className="sidebar__optionLineTwo">& Orders</span>
				</div>
			</Link>
			<a
				href="https://github.com/samyak003/Amazon-Clone"
				onClick={() => closeSidebar()}
			>
				<div className="sidebar__option">
					<span className="sidebar__optionLineOne">Github</span>
					<span className="sidebar__optionLineTwo">Repo</span>
				</div>
			</a>
			{!proUser ? (
				<Link to="/pro" onClick={() => closeSidebar()}>
					<div className="sidebar__option">
						<span className="sidebar__optionLineOne">Upgrade To</span>
						<span className="sidebar__optionLineTwo">Pro</span>
					</div>
				</Link>
			) : (
				<></>
			)}
			<Link to="/checkout" onClick={() => closeSidebar()}>
				<div className="sidebar__optionBasket">
					<ShoppingBasketIcon />
					<span className="sidebar__optionLineTwo header__basketCount">
						{basket?.length}
					</span>
				</div>
			</Link>
		</section>
	);
}

export default Sidebar;
