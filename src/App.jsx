import { Header } from "./components/Header/Header";
import { GamePage } from "./components/GamePage/GamePage";
import "./App.scss";

function App() {
	return (
		<>
			<div className="app">
				<Header />
				<GamePage />
			</div>
		</>
	);
}

export default App;
