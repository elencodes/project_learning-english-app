import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import VocabularyPage from "./components/VocabularyPage/VocabularyPage";
import GamePage from "./components/GamePage/GamePage";
import { MissingPage } from "./components/MissingPage/MissingPage";
import "./App.scss";

function App() {
	return (
		<>
			<Router>
				<div className="app">
					<Header />
					<Routes>
						<Route
							path="https://elencodes.github.io/project_learning-english-app/"
							element={<VocabularyPage />}
						/>
						<Route
							path="https://elencodes.github.io/project_learning-english-app/game"
							element={<GamePage />}
						/>
						<Route path="*" element={<MissingPage />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
