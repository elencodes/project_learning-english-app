import { useState } from "react";
import { Header } from "./components/Header/Header";
import { VocabularyPage } from "./components/VocabularyPage/VocabularyPage";
import "./App.scss";
import { GamePage } from "./components/GamePage/GamePage";

function App() {
	//управление состояниями страниц Vocabulary и Game
	const [isClicked, setIsClicked] = useState(false);

	//функция для перехода на страницу Game (карточки)
	const handleGameClick = () => {
		setIsClicked(true);
	};

	//функция для перехода на страницу Словарь (таблица)
	const handleVocabularyClick = () => {
		setIsClicked(false);
	};

	return (
		<>
			<div className="app">
				<Header
					onVocabulary={handleVocabularyClick}
					onGame={handleGameClick}
				/>
				{isClicked ? <GamePage /> : <VocabularyPage />}
			</div>
		</>
	);
}

export default App;
