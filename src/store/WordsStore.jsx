import { makeAutoObservable, action, runInAction } from "mobx";

class WordsStore {
	words = [];
	isLoading = false;
	error = null;

	constructor() {
		makeAutoObservable(this, {
			loadData: action, // Указываем, что это действие
			handleAdd: action,
			handleDelete: action,
			handleSave: action,
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

			const response = await fetch(
				`https://cors-anywhere.herokuapp.com/https://itgirlschool.justmakeit.ru/api/words/add`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newRow),
				}
			);
			//Если код ответа не 200 (не успешный), то выводим ошибку
			if (!response.ok)
				throw new Error(
					` Internal Server Error! Status: ${response.status}`
				);
			const result = await response.json(); // Убедитесь, что сервер возвращает JSON
			console.log("Response from server:", result);

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
					` Internal Server Error! Status: ${response.status}`
				);
			}
			// Удаляем слово из локального состояния
			runInAction(() => {
				this.words = this.words.filter((word) => word.id !== id);
			});
		} catch (error) {
			runInAction(() => {
				this.error = error.message;
			});
			console.error("Error adding word:", error);
		}
	});

	// Метод для сохранения изменений в словах
	handleSave = action(async (fields) => {
		try {
			const response = await fetch(
				`https://itgirlschool.justmakeit.ru/api/words/${fields.id}/update`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(fields),
				}
			);
			//Если код ответа не 200 (не успешный), то выводим ошибку
			if (!response.ok)
				throw new Error(
					` Internal Server Error! Status: ${response.status}`
				);

			// Обновляем данные локально
			runInAction(() => {
				this.words = this.words.map((word) =>
					word.id === fields.id ? { ...word, ...fields } : word
				);
			});
		} catch (error) {
			runInAction(() => {
				this.error = error.message;
			});
			console.error("Error saving word:", error);
		}
	});
}

const wordsStore = new WordsStore();
export default wordsStore; // Экспортируем экземпляр
