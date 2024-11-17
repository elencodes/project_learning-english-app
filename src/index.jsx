import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WordsProvider } from "./components/WordsContext/WordsContext";

const container = ReactDOM.createRoot(document.getElementById("container"));
container.render(
	<React.StrictMode>
		<WordsProvider>
			<App />
		</WordsProvider>
	</React.StrictMode>
);
