import { makeAutoObservable } from "mobx";

class ThemeStore {
	theme = "light";

	constructor() {
		makeAutoObservable(this); //делаем стор реактивным
	}

	toggleTheme = () => {
		this.theme = this.theme === "light" ? "dark" : "light"; //переключение темы
	};

	setTheme = (newTheme) => {
		this.theme = newTheme; //задание новой темы
	};
}

const themeStore = new ThemeStore();
export default themeStore;
