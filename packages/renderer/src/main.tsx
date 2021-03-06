import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./samples/electron-store";
import "./samples/preload-module";
import "./styles/index.css";

const root = createRoot(document.getElementById("root")!);

root.render(
	<StrictMode>
		<HashRouter>
			<App />
		</HashRouter>
	</StrictMode>
);

window.removeLoading();
