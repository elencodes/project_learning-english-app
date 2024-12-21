import { observer } from "mobx-react-lite";
import { useStore } from "../WordsStoreContext/WordsStoreContext";
import useValidation from "../../hooks/useValidation";
import { useState, useEffect } from "react";
import styles from "./Form.module.scss";

const Form = observer(() => {
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

	// Доступ к MobX-стору через контекст
	const { wordsStore } = useStore();

	// Состояние для значений формы
	const [formValue, setFormValue] = useState({
		tags: "",
		english: "",
		transcription: "",
		russian: "",
	});

	// Cледим за изменениями в formValid и блокируем кнопку при ошибках валидации
	useEffect(() => {
		// Если хотя бы одно поле невалидно, кнопка должна быть заблокирована
		if (
			formValid.tags ||
			formValid.english ||
			formValid.transcription ||
			formValid.russian
		) {
			setIsDisabled(true); // Блокируем кнопку
		} else {
			setIsDisabled(false); // Разблокируем кнопку, если все поля валидны
		}
	}, [formValid, setIsDisabled]);

	// Обработчик изменения значений полей
	const handleChange = (e) => {
		const name = e.target.name; // Получаем имя поля (english, transcription, russian)
		const value = e.target.value; // Получаем новое значение поля
		// Валидация поля
		validateField(name, value); // Проверка поля на корректность
		// Обновляем состояние value с новым значением поля
		setFormValue((prevState) => ({ ...prevState, [name]: value }));
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

		wordsStore.handleAdd({
			tags: formValue.tags,
			english: formValue.english,
			transcription: formValue.transcription,
			russian: formValue.russian,
		});

		setIsDisabled(true); // Блокируем кнопку после добавления

		// Выводим параметры формы в консоль при добавлении

		console.log("Form Values:", formValue);

		setFormValue({
			tags: "",
			english: "",
			transcription: "",
			russian: "",
		});

		// Ожидаем, что состояние очищается, прежде чем обновлять валидацию
		setTimeout(() => {
			// Убираем ошибки, если поля пустые
			validateField("tags", "");
			validateField("english", "");
			validateField("transcription", "");
			validateField("russian", "");
		}, 1500);
	};

	return (
		<>
			<form className={styles.form__container}>
				<div className={styles.input__container}>
					<label className={styles.input__label}>Theme</label>
					<input
						className={`${styles.input__item} ${
							formErrors.tags ? styles.invalid : ""
						}`}
						type="text"
						name="tags"
						value={formValue.tags}
						onChange={handleChange}
					/>
					{formValid.tags && formErrors.tags && (
						<div className={styles.error}>{formErrors.tags}</div>
					)}
				</div>
				<div className={styles.input__container}>
					<label className={styles.input__label}>Word</label>
					<input
						className={`${styles.input__item} ${
							formErrors.english ? styles.invalid : ""
						}`}
						type="text"
						name="english"
						value={formValue.english}
						onChange={handleChange}
					/>
					{formValid.english && formErrors.english && (
						<div className={styles.error}>{formErrors.english}</div>
					)}
				</div>
				<div className={styles.input__container}>
					<label className={styles.input__label}>Transcription</label>
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
					<label className={styles.input__label}>Translation</label>
					<input
						className={`${styles.input__item} ${
							formErrors.russian ? styles.invalid : ""
						}`}
						type="text"
						name="russian"
						value={formValue.russian}
						onChange={handleChange}
					/>
					{formValid.russian && formErrors.russian && (
						<div className={styles.error}>{formErrors.russian}</div>
					)}
				</div>
				<button
					className={`${styles.form__button} ${styles.button__desktop}`}
					type="submit"
					onClick={addNewWord}
					disabled={isDisabled}
				>
					<p className={styles.button__text}>+ Add</p>
				</button>
			</form>
			<button
				className={`${styles.form__button} ${styles.button__mobile}`}
				type="submit"
				onClick={addNewWord}
				disabled={isDisabled}
			>
				<p className={styles.button__text}>+ Add</p>
			</button>
		</>
	);
});

export default Form;
