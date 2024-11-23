import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WordsStoreProvider } from "./components/WordsStoreContext/WordsStoreContext";

const container = ReactDOM.createRoot(document.getElementById("container"));
container.render(
	<React.StrictMode>
		<WordsStoreProvider>
			<App />
		</WordsStoreProvider>
	</React.StrictMode>
);
