import { createContext, useContext } from "react";
import wordsStore from "../../store/WordsStore"; // импортируем экземпляр класса WordsStore

//Метод для создания нового контекста
const WordsStoreContext = createContext(null);

export const WordsStoreProvider = ({ children }) => {
	return (
		// Экземпляр класса кладем в провайдер, чтобы каждый компонент, который лежит внутри провайдера, имел доступ к глобальному хранилищу
		<WordsStoreContext.Provider value={{ wordsStore }}>
			{children}
		</WordsStoreContext.Provider>
	);
};

export const useStore = () => {
	const context = useContext(WordsStoreContext);
	//проверка контекста на корректность
	if (!context) {
		throw new Error("useStore must be used within a WordsStoreProvider");
	}
	return context;
};
