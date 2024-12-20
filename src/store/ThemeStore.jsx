import { makeAutoObservable } from "mobx";

class ThemeStore {
	theme = "dark";

	constructor() {
		makeAutoObservable(this); //делаем стор реактивным
	}

	toggleTheme = () => {
		this.theme = this.theme === "dark" ? "light" : "dark"; //переключение темы
	};

	setTheme = (newTheme) => {
		this.theme = newTheme; //задание новой темы
	};
}

const themeStore = new ThemeStore();
export default themeStore;
