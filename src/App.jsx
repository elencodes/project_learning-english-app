import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useThemeStore } from "./components/ThemeStoreContext/ThemeStoreContext";
import { useEffect } from "react";
import { Header } from "./components/Header/Header";
import VocabularyPage from "./components/VocabularyPage/VocabularyPage";
import GamePage from "./components/GamePage/GamePage";
import { MissingPage } from "./components/MissingPage/MissingPage";
import "./App.scss";

function App() {
	const { themeStore } = useThemeStore(); // Доступ к themeStore
	const theme = themeStore.theme; // Получаем текущую тему

	// Применяем класс темы к body
	useEffect(() => {
		document.body.className = `${theme}-theme`; // Устанавливаем класс темы
	}, [theme]);

	return (
		<>
			<Router basename="/project_learning-english-app">
				<div className={`app ${theme}-theme`}>
					<Header />
					<Routes>
						<Route path="/" element={<VocabularyPage />} />
						<Route path="/game" element={<GamePage />} />
						<Route path="*" element={<MissingPage />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default observer(App);
