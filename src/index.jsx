import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WordsStoreProvider } from "./components/WordsStoreContext/WordsStoreContext";
import { ThemeStoreProvider } from "./components/ThemeStoreContext/ThemeStoreContext";

const container = ReactDOM.createRoot(document.getElementById("container"));
container.render(
	<React.StrictMode>
		<ThemeStoreProvider>
			<WordsStoreProvider>
				<App />
			</WordsStoreProvider>
		</ThemeStoreProvider>
	</React.StrictMode>
);
