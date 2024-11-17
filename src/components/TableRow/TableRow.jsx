import useValidation from "../../hooks/useValidation";
import { useContext, useState, useEffect } from "react";
import { EditMode } from "../EditMode/EditMode";
import { ReadMode } from "../ReadMode/ReadMode";
import { WordsContext } from "../WordsContext/WordsContext";
import styles from "./TableRow.module.scss";

export function TableRow({
	id,
	tags,
	english,
	transcription,
	russian,
	onDelete,
}) {
	const {
		formErrors,
		setFormErrors,
		formValid,
		setFormValid,
		isDisabled,
		setIsDisabled,
		validateField,
	} = useValidation();

	// Используем из контекста (для обновления существующего слова)
	const { updateWord } = useContext(WordsContext);

	// Управление состоянием режима редактирования
	const [isEditing, setIsEditing] = useState(false);

	// Управление состоянием полей в одном объекте
	const [fields, setFields] = useState({
		id,
		tags,
		english,
		transcription,
		russian,
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
	const handleCancelClick = async () => {
		setIsEditing(false);
		setFields({ id, tags, english, transcription, russian }); // Восстанавливаем сохранённые значения полей

		// Сбрасываем ошибки и валидность
		setFormErrors({
			tags: "",
			english: "",
			transcription: "",
			russian: "",
		});
		setFormValid({
			tags: false,
			english: false,
			transcription: false,
			russian: false,
		});
	};

	// Функция для сохранения данных и выхода из режима редактирования
	const handleSaveClick = async () => {
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

		try {
			const response = await fetch(`/api/words/${id}/update`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(fields),
			});
			if (!response.ok)
				throw new Error(`HTTP error! Status: ${response.status}`);
			updateWord(fields); // Обновляем контекст
		} catch (error) {
			console.error("Error updating word:", error);
		}

		// Выводим в консоль параметры формы перед сохранением
		console.log("Saved Fields:", fields);

		// Если все поля заполнены, сохраняем изменения
		setIsEditing(false);
	};

	const handleDeleteClick = () => {
		onDelete(id); // Вызов функции из родительского компонента
	};

	return (
		<tr>
			<td>{id}</td>
			{isEditing ? (
				<>
					<td>
						<input
							className={`${styles.input__item} ${
								formErrors.tags ? styles.invalid : ""
							}`}
							type="text"
							name="tags"
							value={fields.tags}
							onChange={handleChange}
						/>
						{formValid.tags && formErrors.tags && (
							<div className={styles.error}>{formErrors.tags}</div>
						)}
					</td>
					<td>
						<input
							className={`${styles.input__item} ${
								formErrors.english ? styles.invalid : ""
							}`}
							type="text"
							name="english"
							value={fields.english}
							onChange={handleChange}
						/>
						{formValid.english && formErrors.english && (
							<div className={styles.error}>{formErrors.english}</div>
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
								formErrors.russian ? styles.invalid : ""
							}`}
							type="text"
							name="russian"
							value={fields.russian}
							onChange={handleChange}
						/>
						{formValid.russian && formErrors.russian && (
							<div className={styles.error}>{formErrors.russian}</div>
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
					<td>{tags}</td>
					<td>{english}</td>
					<td>{transcription}</td>
					<td>{russian}</td>
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
