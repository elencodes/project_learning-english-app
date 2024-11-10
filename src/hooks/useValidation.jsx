import { useState, useEffect } from "react";

// Хук useValidation для валидации полей формы
const useValidation = () => {
	// Состояние для хранения сообщений об ошибках валидации
	const [formErrors, setFormErrors] = useState({
		theme: "",
		word: "",
		transcription: "",
		translation: "",
	});

	// Состояние для отслеживания, является ли поле валидным
	const [formValid, setFormValid] = useState({
		theme: false,
		word: false,
		transcription: false,
		translation: false,
	});

	// Состояние для контроля активности кнопки (например, для кнопки "Save")
	const [isDisabled, setIsDisabled] = useState(true);

	// Функция validateField для проверки конкретного поля на соответствие правилам валидации
	function validateField(name, value) {
		// Если поле пустое, устанавливаем ошибку и отмечаем его как невалидное
		if (value === "") {
			setFormValid({ ...formValid, [name]: true }); // Обновляем статус валидности для текущего поля
			setFormErrors({ ...formErrors, [name]: "Field is empty!" }); // Устанавливаем сообщение об ошибке
		} else if (/^\s+$/.test(value)) {
			// Проверка на строку, состоящую только из пробелов
			setFormValid({ ...formValid, [name]: true }); // Поле невалидно
			setFormErrors({
				...formErrors,
				[name]: "Field cannot be only spaces!",
			}); // Сообщение об ошибке
		} else {
			// Переходим к проверке конкретного поля в зависимости от его имени
			switch (name) {
				// Валидация для поля "theme"
				case "theme":
					// Проверка на соответствие латинским символам и чтобы строка не состояла только из пробелов
					if (/^(?!\s*$)[A-Za-z ']+$/i.test(value)) {
						setFormValid({ ...formValid, theme: false }); // Поле валидно
						setFormErrors({ ...formErrors, theme: "" }); // Ошибки нет
					} else {
						setFormValid({ ...formValid, theme: true }); // Поле невалидно
						setFormErrors({ ...formErrors, theme: "Just latin!" }); // Сообщение об ошибке
					}
					break;

				// Валидация для поля "word"
				case "word":
					// Проверка на соответствие латинским символам и чтобы строка не состояла только из пробелов
					if (/^(?!\s*$)[A-Za-z ']+$/i.test(value)) {
						setFormValid({ ...formValid, word: false }); // Поле валидно
						setFormErrors({ ...formErrors, word: "" }); // Ошибки нет
					} else {
						setFormValid({ ...formValid, word: true }); // Поле невалидно
						setFormErrors({ ...formErrors, word: "Just latin!" }); // Сообщение об ошибке
					}
					break;

				// Валидация для поля "transcription"
				case "transcription":
					// Проверка, чтобы строка не состояла только из пробелов и чтобы разрешить символы: латиница, пробелы, ':', 'æ', 'ŋ', 'ɔ', 'ʊ', 'ə', 'ʌ', 'ʃ', 'θ', '[', ']'
					if (
						/^(?!\s*$)[A-Za-z :æŋ'ɔʊəʌʃθ\[\]ˈ\u0250-\u02AF\u0370-\u03FF\u1D00-\u1D7F\u1D80-\u1DBF\u1DC0-\u1DFF\u02B0-\u02FF\u0300-\u036F\u2000-\u206F\s]+$/i.test(
							value
						)
					) {
						setFormValid({ ...formValid, transcription: false }); // Поле валидно
						setFormErrors({ ...formErrors, transcription: "" }); // Ошибки нет
					} else {
						setFormValid({ ...formValid, transcription: true }); // Поле невалидно
						setFormErrors({
							...formErrors,
							transcription: "Just latin, symbols :æŋ'ɔʊəʌʃθ and []!",
						}); // Сообщение об ошибке
					}
					break;

				// Валидация для поля "translation"
				case "translation":
					// Проверка на соответствие кириллическим символам и чтобы строка не состояла только из пробелов
					if (/^(?!\s*$)[а-яё -]+$/i.test(value)) {
						setFormValid({ ...formValid, translation: false }); // Поле валидно
						setFormErrors({ ...formErrors, translation: "" }); // Ошибки нет
					} else {
						setFormValid({ ...formValid, translation: true }); // Поле невалидно
						setFormErrors({
							...formErrors,
							translation: "Just cyrillic!",
						}); // Сообщение об ошибке
					}
					break;

				// Если значение name не совпадает ни с одним из условий, ничего не делаем
				default:
					break;
			}
		}
	}

	// useEffect для управления состоянием isDisabled в зависимости от formValid
	useEffect(() => {
		const hasErrors = Object.values(formValid).some((field) => field); // Проверка на наличие ошибок
		setIsDisabled(hasErrors); // Блокируем кнопку, если есть ошибки
	}, [formValid]);

	// Возвращаем необходимые переменные и функции для использования вне этого хука
	return {
		formErrors, // Объект, содержащий сообщения об ошибках для каждого поля формы (например, "Field is empty!" или "Just latin!").
		setFormErrors, // Функция для обновления состояния `formErrors`. Используется для установки конкретных сообщений об ошибках для полей.
		formValid, // Объект, отслеживающий, являются ли отдельные поля формы валидными (true - если есть ошибка, false - если нет ошибки).
		setFormValid, // Функция для обновления состояния `formValid`. Позволяет установить, является ли поле формы валидным.
		isDisabled, // Логическое значение, которое контролирует, должна ли кнопка отправки быть заблокирована (true - заблокирована, false - разблокирована).
		setIsDisabled, // Функция для изменения значения `isDisabled`. Используется для блокировки или разблокировки кнопки отправки.
		validateField, // Функция, которая выполняет проверку конкретного поля формы, проверяя его значение на соответствие правилам валидации.
	};
};

export default useValidation;
