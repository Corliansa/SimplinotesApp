import { Routes, Route } from "react-router-dom";
import Note from "./components/Note";
import Home from "./components/Home";
import History from "./components/History";
import Histories from "./components/Histories";
import { useEffect } from "react";
import example from "./etc/tutorial";

import "./App.css";

function App() {
	useEffect(() => {
		if (!localStorage.getItem("@simplinotes/settings")) {
			localStorage.setItem("notes:tutorial", example);
			localStorage.setItem(
				"@simplinotes/settings",
				JSON.stringify({ initial: true })
			);
		}
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/note/:id" element={<Note />} />
				<Route path="/history/:id/:time" element={<History />} />
				<Route path="/history/:id" element={<Histories />} />
			</Routes>
		</div>
	);
}

export default App;
