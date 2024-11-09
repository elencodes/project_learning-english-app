import { useState } from "react";
import { EditMode } from "../EditMode/EditMode";
import { ReadMode } from "../ReadMode/ReadMode";
import styles from "./TableRow.module.scss";

export function TableRow(props) {
	// Управление состоянием режима редактирования
	const [isEditing, setIsEditing] = useState(false);

	// Управление состоянием полей в одном объекте
	const [fields, setFields] = useState({
		theme: props.theme,
		word: props.word,
		transcription: props.transcription,
		translation: props.translation,
	});

	// Управление состоянием для сохраненных значений полей ввода
	const [savedFields, setSavedFields] = useState(fields);

	// Функция для перехода в режим редактирования
	const handleEditClick = () => {
		setIsEditing(true);
	};

	// Функция для отмены режима редактирования с восстановлением сохранённых данных
	const handleCancelClick = () => {
		setIsEditing(false);
		setFields(savedFields);
	};

	// Функция для сохранения данных и выхода из режима редактирования
	const handleSaveClick = () => {
		setIsEditing(false);
		setSavedFields(fields);
	};

	// Обработчик изменений всех полей ввода
	const handleChange = (e) => {
		const { name, value } = e.target;
		//Используется функция обратного вызова (callback) для setFields,
		//которая принимает предыдущее состояние (prevFields) и возвращает обновлённое состояние
		setFields((prevFields) => ({
			...prevFields,
			//Переменная name подставляет ключ для обновляемого поля (например, theme),
			//а value устанавливает его новое значение.
			[name]: value,
		}));
	};

	return (
		<tr>
			<td>{props.id}</td>
			{isEditing ? (
				<>
					<td>
						<input
							className={styles.input__item}
							type="text"
							name="theme"
							value={fields.theme}
							onChange={handleChange}
						/>
					</td>
					<td>
						<input
							className={styles.input__item}
							type="text"
							name="word"
							value={fields.theme}
							onChange={handleChange}
						/>
					</td>
					<td>
						<input
							className={styles.input__item}
							type="text"
							name="transcription"
							value={fields.transcription}
							onChange={handleChange}
						/>
					</td>
					<td>
						<input
							className={styles.input__item}
							type="text"
							name="translation"
							value={fields.translation}
							onChange={handleChange}
						/>
					</td>
					<td className={styles.table__actions}>
						<div className={styles.button__container}>
							<EditMode
								onCancel={handleCancelClick}
								onSave={handleSaveClick}
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
							<ReadMode onEdit={handleEditClick} />
						</div>
					</td>
				</>
			)}
		</tr>
	);
}
