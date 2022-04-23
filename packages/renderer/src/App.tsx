import { Routes, Route } from "react-router-dom";
import Note from "./components/Note";
import Home from "./components/Home";
import History from "./components/History";
import Histories from "./components/Histories";
import Settings from "./components/Settings";
import { useEffect } from "react";
import example from "./etc/tutorial";

import "./App.css";

function App() {
	const settings = localStorage.getItem("@simplinotes/settings");
	const customStyle = JSON.parse(settings! || "{}");

	useEffect(() => {
		if (!settings) {
			localStorage.setItem("notes:tutorial", example);
			localStorage.setItem(
				"@simplinotes/settings",
				JSON.stringify({ initial: true })
			);
		}
	}, []);

	return (
		<div
			className="App"
			style={{ color: customStyle?.color, background: customStyle?.background }}
		>
			<Routes>
				<Route index={true} element={<Home />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/note/:id" element={<Note />} />
				<Route path="/history/:id/:time" element={<History />} />
				<Route path="/history/:id" element={<Histories />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
