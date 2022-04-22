import { useState } from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import styles from "../styles/Home.module.css";
function Home() {
	const [background, setBackground] = useState("");
	const [color, setColor] = useState("");
	return (
		<div className="container">
			<div className="menu">
				<Link to="/">← Back</Link>
			</div>
			<div className={styles.main}>
				<h1>Settings</h1>
			</div>
		</div>
	);
}

export default Home;
