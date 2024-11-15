import useValidation from "../../hooks/useValidation";
import { useState, useEffect } from "react";
import styles from "./Form.module.scss";

export function Form({ handleAdd }) {
	// Деструктуризация пропсов
	const {
		formErrors,
		setFormErrors,
		formValid,
		setFormValid,
		isDisabled,
		setIsDisabled,
		validateField,
	} = useValidation();

	// Состояние для значений формы
	const [formValue, setFormValue] = useState({
		theme: "",
		word: "",
		transcription: "",
		translation: "",
	});

	// Cледим за изменениями в formValid и блокируем кнопку при ошибках валидации
	useEffect(() => {
		// Если хотя бы одно поле невалидно, кнопка должна быть заблокирована
		if (
			formValid.theme ||
			formValid.word ||
			formValid.transcription ||
			formValid.translation
		) {
			setIsDisabled(true); // Блокируем кнопку
		} else {
			setIsDisabled(false); // Разблокируем кнопку, если все поля валидны
		}
	});

	// Обработчик изменения значений полей
	const handleChange = (e) => {
		const name = e.target.name; // Получаем имя поля (english, transcription, russian)
		const value = e.target.value; // Получаем новое значение поля
		// Валидация поля
		validateField(name, value); // Проверка поля на корректность
		// Обновляем состояние value с новым значением поля
		setFormValue({
			...formValue,
			[name]: value,
		});
	};

	// Проверка полей на пустые значения при нажатии на "+Add"
	const validateFormBeforeAdd = () => {
		let hasEmptyFields = false;
		const newFormErrors = { ...formErrors };
		const newFormValid = { ...formValid };

		// Проверяем каждое поле на пустоту
		for (const field in formValue) {
			if (formValue[field] === "") {
				newFormErrors[field] = "Field is empty!";
				newFormValid[field] = true;
				hasEmptyFields = true;
			} else {
				newFormErrors[field] = ""; // Ошибка отсутствует, если поле заполнено
				newFormValid[field] = false;
			}
		}

		// Обновляем состояние ошибок и валидности полей
		setFormErrors(newFormErrors);
		setFormValid(newFormValid);
		setIsDisabled(hasEmptyFields); // Блокируем кнопку, если есть пустые поля

		return hasEmptyFields; // Возвращаем, есть ли пустые поля
	};

	// Обработчик добавления нового слова
	const addNewWord = (e) => {
		e.preventDefault(); // Предотвращаем перезагрузку страницы

		// Если есть пустые поля, выходим из функции
		if (validateFormBeforeAdd()) return;

		// Создаём новую строку данных
		const newRow = {
			theme: formValue.theme,
			word: formValue.word,
			transcription: formValue.transcription,
			translation: formValue.translation,
		};

		// Выводим параметры формы в консоль перед добавлением
		console.log("Form Values:", newRow);

		// Передаём новую строку в родительский компонент
		handleAdd(newRow);

		// Очищаем форму после успешного добавления
		setFormValue({ theme: "", word: "", transcription: "", translation: "" });

		// Блокируем кнопку после добавления
		setIsDisabled(true);
	};

	return (
		<>
			<form className={styles.form__container}>
				<div className={styles.input__container}>
					<label>Theme</label>
					<input
						className={`${styles.input__item} ${
							formErrors.theme ? styles.invalid : ""
						}`}
						type="text"
						name="theme"
						value={formValue.theme}
						onChange={handleChange}
					/>
					{formValid.theme && formErrors.theme && (
						<div className={styles.error}>{formErrors.theme}</div>
					)}
				</div>
				<div className={styles.input__container}>
					<label>Word</label>
					<input
						className={`${styles.input__item} ${
							formErrors.word ? styles.invalid : ""
						}`}
						type="text"
						name="word"
						value={formValue.word}
						onChange={handleChange}
					/>
					{formValid.word && formErrors.word && (
						<div className={styles.error}>{formErrors.word}</div>
					)}
				</div>
				<div className={styles.input__container}>
					<label>Transcription</label>
					<input
						className={`${styles.input__item} ${
							formErrors.transcription ? styles.invalid : ""
						}`}
						type="text"
						name="transcription"
						value={formValue.transcription}
						onChange={handleChange}
					/>
					{formValid.transcription && formErrors.transcription && (
						<div className={styles.error}>{formErrors.transcription}</div>
					)}
				</div>
				<div className={styles.input__container}>
					<label>Translation</label>
					<input
						className={`${styles.input__item} ${
							formErrors.translation ? styles.invalid : ""
						}`}
						type="text"
						name="translation"
						value={formValue.translation}
						onChange={handleChange}
					/>
					{formValid.translation && formErrors.translation && (
						<div className={styles.error}>{formErrors.translation}</div>
					)}
				</div>
				<button
					className={styles.form__button}
					type="submit"
					onClick={addNewWord}
					disabled={isDisabled}
				>
					<p className={styles.button__text}>+ Add</p>
				</button>
			</form>
		</>
	);
}
