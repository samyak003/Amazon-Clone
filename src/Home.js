import React, { useEffect } from "react";
import "./Home.css";
import { db } from "./firebase";
import { useState } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Suspense } from "react";

const Product = React.lazy(() => import("./Product"));
function Home() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		var slideIndex = 1;
		showDivs(slideIndex);

		function plusDivs(n) {
			showDivs((slideIndex += n));
		}

		function showDivs(n) {
			var i;
			var x = document.getElementsByClassName("home__image");
			if (n > x.length) {
				slideIndex = 1;
			}
			if (n < 1) {
				slideIndex = x.length;
			}
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "none";
			}
			x[slideIndex - 1].style.display = "block";
		}
		const prev = document.getElementById("home__slideshowBack");
		const next = document.getElementById("home__slideshowForward");

		next.addEventListener("click", () => {
			plusDivs(1);
		});
		prev.addEventListener("click", () => {
			plusDivs(-1);
		});
	}, []);
	useEffect(() => {
		db.collection("products").onSnapshot((snapshot) => {
			setProducts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					product: doc.data(),
				})),
			);
		});
	}, [products]);
	return (
		<div className="home">
			<div id="slideshow" className="home__container">
				<ArrowBackIosIcon id="home__slideshowBack" />
				<img
					alt="banner"
					className="home__image"
					src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/Multititle/Aug/3000x1200_Hero-Tall_np._CB404803728_.jpg"
				/>
				<img
					alt="banner"
					className="home__image"
					src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/under1499store/english/Gateway/updated/V242338866_IN_CEPC_Under-1499_store_Graphics_3000x1200._CB406499466_.jpg
"
				/>
				<img
					alt="banner"
					className="home__image"
					src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/PC/3000-1200._CB404152881_.jpg
"
				/>
				<img
					alt="banner"
					className="home__image"
					src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Rajeshwari/September/GWBanners/Control/DesktopHero_3000x1200._CB405007888_.jpg"
				/>
				<ArrowForwardIosIcon id="home__slideshowForward" />
			</div>
			<div className="home__row">
				<Suspense fallback={<div>Loading...</div>}>
					{products.map(({ id, product }, index) => (
						<Product
							key={id}
							id={id}
							index={index}
							image={product.image}
							title={product.title}
							price={product.price}
							rating={product.rating}
						/>
					))}
				</Suspense>
			</div>
		</div>
	);
}

export default Home;
