import useValidation from "../../hooks/useValidation";
import { useState, useEffect } from "react";
import { EditMode } from "../EditMode/EditMode";
import { ReadMode } from "../ReadMode/ReadMode";
import styles from "./TableRow.module.scss";

export function TableRow(props) {
	const {
		formErrors,
		setFormErrors,
		formValid,
		setFormValid,
		isDisabled,
		setIsDisabled,
		validateField,
	} = useValidation();

	// Управление состоянием режима редактирования
	const [isEditing, setIsEditing] = useState(false);

	// Управление состоянием полей в одном объекте
	const [fields, setFields] = useState({
		id: props.id,
		theme: props.theme,
		word: props.word,
		transcription: props.transcription,
		translation: props.translation,
	});

	// Управление состоянием для сохраненных значений полей ввода
	const [savedFields, setSavedFields] = useState(fields);

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
	}, [formValid, setIsDisabled]);

	// Обработчик изменений всех полей ввода
	const handleChange = (e) => {
		const name = e.target.name; // Получаем имя поля (english, transcription, russian)
		const value = e.target.value; // Получаем новое значение поля
		// Валидация поля
		validateField(name, value); // Проверка поля на корректность
		//Используется функция обратного вызова (callback) для setFields,
		//которая принимает предыдущее состояние (prevFields) и возвращает обновлённое состояние
		setFields((prevFields) => ({
			...prevFields,
			//Переменная name подставляет ключ для обновляемого поля (например, theme),
			//а value устанавливает его новое значение.
			[name]: value,
		}));
	};

	// Функция для перехода в режим редактирования
	const handleEditClick = () => {
		setIsEditing(true);
	};

	// Функция для отмены режима редактирования с восстановлением сохранённых данных
	const handleCancelClick = () => {
		setIsEditing(false);
		setFields(savedFields); // Восстанавливаем сохранённые значения полей

		// Сбрасываем ошибки и валидность
		setFormErrors({
			theme: "",
			word: "",
			transcription: "",
			translation: "",
		});
		setFormValid({
			theme: false,
			word: false,
			transcription: false,
			translation: false,
		});
	};

	// Функция для сохранения данных и выхода из режима редактирования
	const handleSaveClick = () => {
		let hasEmptyFields = false;
		const updatedFormErrors = { ...formErrors };
		const updatedFormValid = { ...formValid };

		// Проверяем, заполнены ли все поля
		for (let field in fields) {
			if (fields[field] === "" && field !== "id") {
				// Пропускаем поле `id`
				updatedFormErrors[field] = "Field is empty!";
				updatedFormValid[field] = true;
				hasEmptyFields = true;
			} else {
				updatedFormErrors[field] = ""; // Сбрасываем ошибку, если поле заполнено
				updatedFormValid[field] = false;
			}
		}

		// Обновляем состояния ошибок и валидности
		setFormErrors(updatedFormErrors);
		setFormValid(updatedFormValid);

		// Если есть пустые поля, выходим из функции
		if (hasEmptyFields) {
			setIsDisabled(true); // Блокируем кнопку Save
			return;
		}

		// Выводим в консоль параметры формы перед сохранением
		console.log("Saved Fields:", fields);

		// Если все поля заполнены, сохраняем изменения
		setIsEditing(false);
		setSavedFields(fields);
	};

	// Обработчик для удаления строки
	const handleDeleteClick = () => {
		props.onDelete(props.id); // Вызываем функцию удаления, переданную через props
	};

	return (
		<tr>
			<td>{props.id}</td>
			{isEditing ? (
				<>
					<td>
						<input
							className={`${styles.input__item} ${
								formErrors.theme ? styles.invalid : ""
							}`}
							type="text"
							name="theme"
							value={fields.theme}
							onChange={handleChange}
						/>
						{formValid.theme && formErrors.theme && (
							<div className={styles.error}>{formErrors.theme}</div>
						)}
					</td>
					<td>
						<input
							className={`${styles.input__item} ${
								formErrors.word ? styles.invalid : ""
							}`}
							type="text"
							name="word"
							value={fields.word}
							onChange={handleChange}
						/>
						{formValid.word && formErrors.word && (
							<div className={styles.error}>{formErrors.word}</div>
						)}
					</td>
					<td>
						<input
							className={`${styles.input__item} ${
								formErrors.transcription ? styles.invalid : ""
							}`}
							type="text"
							name="transcription"
							value={fields.transcription}
							onChange={handleChange}
						/>
						{formValid.transcription && formErrors.transcription && (
							<div className={styles.error}>
								{formErrors.transcription}
							</div>
						)}
					</td>
					<td>
						<input
							className={`${styles.input__item} ${
								formErrors.translation ? styles.invalid : ""
							}`}
							type="text"
							name="translation"
							value={fields.translation}
							onChange={handleChange}
						/>
						{formValid.translation && formErrors.translation && (
							<div className={styles.error}>
								{formErrors.translation}
							</div>
						)}
					</td>
					<td className={styles.table__actions}>
						<div className={styles.button__container}>
							<EditMode
								onCancel={handleCancelClick}
								onSave={handleSaveClick}
								isDisabled={isDisabled}
							/>
						</div>
					</td>
				</>
			) : (
				<>
					<td>{savedFields.theme}</td>
					<td>{savedFields.word}</td>
					<td>{savedFields.transcription}</td>
					<td>{savedFields.translation}</td>
					<td className={styles.table__actions}>
						<div className={styles.button__container}>
							<ReadMode
								onEdit={handleEditClick}
								onDelete={handleDeleteClick}
							/>
						</div>
					</td>
				</>
			)}
		</tr>
	);
}
