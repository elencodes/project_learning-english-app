import { observer } from "mobx-react-lite";
import useValidation from "../../hooks/useValidation";
import { useState, useEffect } from "react";
import { EditMode } from "../EditMode/EditMode";
import ReadMode from "../ReadMode/ReadMode";
import { useStore } from "../WordsStoreContext/WordsStoreContext";
import styles from "./TableRow.module.scss";

const TableRow = observer(
	({ id, tags, english, transcription, russian, isCardView }) => {
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

			// Вызываем метод из WordsStore для сохранения
			try {
				await wordsStore.handleSave(fields);
			} catch (error) {
				console.error("Error updating word:", error);
			}

			// Выводим в консоль параметры формы перед сохранением
			console.log("Saved Fields:", fields);

			// Если все поля заполнены, сохраняем изменения
			setIsEditing(false);
		};

		const handleDeleteClick = () => {
			wordsStore.handleDelete(id);
		};

		return isCardView ? (
			<>
				<div className={styles.card} key={id}>
					<p className={styles.card__info_title}>
						№: <span className={styles.card__info_text}>{id}</span>
					</p>
					{isEditing ? (
						<>
							<div>
								<p className={styles.card__info_title}>
									Theme:{" "}
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
										<div className={styles.error}>
											{formErrors.tags}
										</div>
									)}
								</p>
							</div>
							<div>
								<p className={styles.card__info_title}>
									Word:{" "}
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
										<div className={styles.error}>
											{formErrors.english}
										</div>
									)}
								</p>
							</div>
							<div>
								<p className={styles.card__info_title}>
									Transcription:{" "}
									<input
										className={`${styles.input__item} ${
											formErrors.transcription ? styles.invalid : ""
										}`}
										type="text"
										name="transcription"
										value={fields.transcription}
										onChange={handleChange}
									/>
									{formValid.transcription &&
										formErrors.transcription && (
											<div className={styles.error}>
												{formErrors.transcription}
											</div>
										)}
								</p>
							</div>
							<div>
								<p className={styles.card__info_title}>
									Translation:{" "}
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
										<div className={styles.error}>
											{formErrors.russian}
										</div>
									)}
								</p>
							</div>
							<div className={styles.table__actions}>
								<div className={styles.button__container}>
									<EditMode
										onCancel={handleCancelClick}
										onSave={handleSaveClick}
										isDisabled={isDisabled}
									/>
								</div>
							</div>
						</>
					) : (
						<>
							<p className={styles.card__info_title}>
								Theme:{" "}
								<span className={styles.card__info_text}>{tags}</span>
							</p>
							<p className={styles.card__info_title}>
								Word:{" "}
								<span className={styles.card__info_text}>
									{english}
								</span>
							</p>
							<p className={styles.card__info_title}>
								Transcription:{" "}
								<span className={styles.card__info_text}>
									{transcription}
								</span>
							</p>
							<p className={styles.card__info_title}>
								Translation:{" "}
								<span className={styles.card__info_text}>
									{russian}
								</span>
							</p>
							<div className={styles.button__container}>
								<ReadMode
									onEdit={handleEditClick}
									onDelete={handleDeleteClick}
								/>
							</div>
						</>
					)}
				</div>
			</>
		) : (
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
);

export default TableRow;
