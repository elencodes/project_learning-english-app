import { makeAutoObservable, action, runInAction } from "mobx";

class WordsStore {
	words = []; // Полный список слов
	selectedThemes = []; // Выбранные темы для фильтрации
	filteredWords = []; // Отфильтрованный список слов
	searchQuery = ""; // Состояние для хранения поискового запроса
	isLoading = false;
	error = null;

	constructor() {
		makeAutoObservable(this, {
			loadData: action, // Указываем, что это действие
			handleAdd: action,
			handleDelete: action,
			handleSave: action,
			handleSearch: action,
			applyThemeFilter: action,
			clearThemeFilter: action,
			generateNewId: false, // Это не действие
		});
	}

	// Генерация нового уникального ID
	generateNewId() {
		// Если массив пустой, начинаем с 1, иначе берем максимальный id + 1
		return this.words.length > 0
			? Math.max(...this.words.map((item) => item.id)) + 1
			: 1;
	}

	loadData = action(async () => {
		this.isLoading = true;
		this.error = null;
		try {
			const response = await fetch(
				"https://itgirlschool.justmakeit.ru/api/words"
			);
			//Если код ответа не 200 (не успешный), то выводим ошибку
			if (!response.ok) {
				throw new Error("Failed to fetch words");
			}
			const data = await response.json();
			// Убедимся, что каждому слову есть уникальный id
			runInAction(() => {
				this.words = data.map((item, index) => ({
					...item,
					id: item.id || index + 1, // Если id отсутствует, задаем уникальный
				}));
				this.filteredWords = this.words; // Изначально отображаем все слова
			});
		} catch (error) {
			runInAction(() => {
				this.error = error.message;
			});
			console.log("Error fetching words:", error);
		} finally {
			// Выключаем индикатор загрузки
			runInAction(() => {
				this.isLoading = false;
			});
		}
	});

	// Метод для добавления нового слова
	handleAdd = action(async (value) => {
		this.isLoading = true; // Включаем индикатор загрузки
		try {
			const newRow = {
				id: this.generateNewId(),
				tags: value.tags || "",
				english: value.english || "",
				transcription: value.transcription || "",
				russian: value.russian || "",
			};

			// Локально добавляем новую строку
			runInAction(() => {
				this.words.push(newRow);
			});

			const response = await fetch(`/api/words/add`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newRow),
			});
			//Если код ответа не 200 (не успешный), то выводим ошибку
			if (!response.ok)
				throw new Error(` "Failed to add word! Status: ${response.status}`);

			// Обновляем данные из сервера для синхронизации
			await this.loadData();
		} catch (error) {
			runInAction(() => {
				this.error = error.message;
			});
			console.error("Error adding word:", error);
		} finally {
			// Выключаем индикатор загрузки
			runInAction(() => {
				this.isLoading = false;
			});
		}
	});

	// Метод для сохранения изменений в словах
	handleSave = action(async (updatedWord) => {
		const index = this.words.findIndex((word) => word.id === updatedWord.id);
		if (index === -1) return;
		try {
			// Отправка изменённых данных на сервер (можно добавить логику для реального API)
			this.words[index] = updatedWord; // Обновляем в локальном хранилище

			const response = await fetch(
				`https://itgirlschool.justmakeit.ru/api/words/${updatedWord.id}/update`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updatedWord),
				}
			);
			//Если код ответа не 200 (не успешный), то выводим ошибку
			if (!response.ok)
				throw new Error(
					` "Failed to save word! Status: ${response.status}`
				);
		} catch (error) {
			runInAction(() => {
				this.error = error.message;
			});
			console.error("Error saving word:", error);
		}
	});

	// Метод для удаления слова по ID через API
	handleDelete = action(async (id) => {
		try {
			// Отправляем запрос на удаление через API
			const response = await fetch(
				`https://itgirlschool.justmakeit.ru/api/words/${id}/delete`,
				{
					method: "POST",
				}
			);
			//Если код ответа не 200 (не успешный), то выводим ошибку
			if (!response.ok) {
				throw new Error(
					` "Failed to delete word! Status: ${response.status}`
				);
			}
			// Обновление состояния после успешного удаления с сервера
			runInAction(() => {
				const index = this.words.findIndex((word) => word.id === id);
				if (index !== -1) {
					this.words.splice(index, 1); // Удаляем слово из массива с использованием splice
				}
			});
		} catch (error) {
			runInAction(() => {
				this.error = error.message;
			});
			console.error("Error adding word:", error);
		}
	});

	// Метод для поиска слов
	handleSearch = action((query) => {
		this.searchQuery = query.toLowerCase(); // Обновляем поисковый запрос
		if (!this.searchQuery) {
			// Если запрос пустой, возвращаем полный список
			this.filteredWords = this.words;
		} else {
			// Фильтруем список слов
			this.filteredWords = this.words.filter(
				(word) =>
					word.english.toLowerCase().includes(this.searchQuery) ||
					word.russian.toLowerCase().includes(this.searchQuery)
			);
		}
	});

	// Метод для установки фильтра по темам
	applyThemeFilter(selectedThemes) {
		this.selectedThemes = selectedThemes;
		if (selectedThemes.length > 0) {
			this.filteredWords = this.words.filter(
				(word) => selectedThemes.includes(word.tags) // Условие фильтрации
			);
		} else {
			this.filteredWords = this.words; // Если фильтр пустой, показываем всё
		}
	}

	// Сброс фильтра
	clearThemeFilter() {
		this.selectedThemes = [];
		this.filteredWords = this.words;
	}
}

const wordsStore = new WordsStore();
export default wordsStore; // Экспортируем экземпляр
