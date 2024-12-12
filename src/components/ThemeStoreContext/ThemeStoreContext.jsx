import { createContext, useContext } from "react";
import themeStore from "../../store/ThemeStore"; // импортируем экземпляр класса ThemeStore

//Метод для создания нового контекста
const ThemeStoreContext = createContext(null);

export const ThemeStoreProvider = ({ children }) => {
	return (
		// Экземпляр класса кладем в провайдер, чтобы каждый компонент, который лежит внутри провайдера, имел доступ к глобальному хранилищу
		<ThemeStoreProvider.Provider value={{ themeStore }}>
			{children}
		</ThemeStoreProvider.Provider>
	);
};

export const useThemeStore = () => {
	const context = useContext(ThemeStoreContext);
	//проверка контекста на корректность
	if (!context) {
		throw new Error("useThemeStore must be used within a ThemeStoreProvider");
	}
	return context;
};
