import { createContext, useState, useEffect } from "react";

//Метод для создания нового контекста
const WordsContext = createContext();

//Компонент, который хранит общее состояние - Provider (донор).
const WordsProvider = ({ children }) => {
	//Состояние для хранения списка слов
	const [words, setWords] = useState([]);
	//Состояние для хранения ошибок при отправке запросов на сервер
	const [error, setError] = useState(null);
	//Состояние для показа загрузки данных
	const [isLoading, setIsLoading] = useState(false);

	//Функция добавления нового слова
	const addWord = (newWord) => {
		setWords((prevWords) => [...prevWords, newWord]);
	};

	// Функция обновления существующего слова
	const updateWord = (updatedWord) => {
		setWords((prevWords) =>
			prevWords.map((word) =>
				word.id === updatedWord.id ? updatedWord : word
			)
		);
	};

	const deleteWord = (id) => {
		console.log("Deleting word with id:", id); // Для отладки
		setWords((prevWords) => prevWords.filter((word) => word.id !== id));
	};

	const loadData = async () => {
		try {
			const response = await fetch(
				"http://itgirlschool.justmakeit.ru/api/words"
			);
			//Проверяем что код ответа 200
			if (!response.ok) {
				throw new Error("Failed to fetch words");
			}
			const data = await response.json();
			//Инициализация состояния words через контекст
			setWords(data);
			setIsLoading(false);
		} catch (error) {
			console.log("Error fetching words:", setError(error));
		}
	};

	// Загружаем данные при монтировании компонента
	useEffect(() => {
		setIsLoading(true);
		loadData();
	}, []);

	return (
		<WordsContext.Provider
			value={{
				words,
				setWords,
				loadData,
				addWord,
				updateWord,
				deleteWord,
				error,
				isLoading,
			}}
		>
			{children}
		</WordsContext.Provider>
	);
};

export { WordsProvider, WordsContext };
