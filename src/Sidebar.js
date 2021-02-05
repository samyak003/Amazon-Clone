import React from "react";
import "./Sidebar.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Sidebar() {
	const [{ basket, user }, dispatch] = useStateValue();
	const handleAuthentiction = () => {
		if (user) {
			auth.signOut();
		}
	};
	return (
		<div className="sidebar">
			<Link to={user ? "/" : "/login"}>
				<div onClick={handleAuthentiction} className="sidebar__option">
					<span className="sidebar__optionLineOne">
						Hello, {user ? user.displayName || user.email : "Guest"}
					</span>
					<span className="sidebar__optionLineTwo">
						{user ? "Sign Out" : "Sign In"}
					</span>
				</div>
			</Link>
			<Link to="/orders">
				<div className="sidebar__option">
					<span className="sidebar__optionLineOne">Returns</span>
					<span className="sidebar__optionLineTwo">& Orders</span>
				</div>
			</Link>
			<div onClick={() => alert("Available soon")} className="sidebar__option">
				<span className="sidebar__optionLineOne">Github</span>
				<span className="sidebar__optionLineTwo">Repo</span>
			</div>
			<Link to="/checkout">
				<div className="sidebar__optionBasket">
					<ShoppingBasketIcon />
					<span className="sidebar__optionLineTwo header__basketCount">
						{basket?.length}
					</span>
				</div>
			</Link>
		</div>
	);
}

export default Sidebar;
