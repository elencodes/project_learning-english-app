import { useState } from "react";
import { EditMode } from "../EditMode/EditMode";
import { ReadMode } from "../ReadMode/ReadMode";
import styles from "./TableRow.module.scss";

export function TableRow(props) {
	// Управление состоянием режима редактирования
	const [isEditing, setIsEditing] = useState(false);

	// Состояния для управления значениями полей ввода
	const [statusTheme, setStatusTheme] = useState(props.theme);
	const [statusWord, setStatusWord] = useState(props.word);
	const [statusTranscription, setStatusTranscription] = useState(
		props.transcription
	);
	const [statusTranslation, setStatusTranslation] = useState(
		props.translation
	);

	// Состояния для хранения сохраненных значений (после нажатия на кнопку Save)
	const [savedTheme, setSavedTheme] = useState(props.theme);
	const [savedWord, setSavedWord] = useState(props.word);
	const [savedTranscription, setSavedTranscription] = useState(
		props.transcription
	);
	const [savedTranslation, setSavedTranslation] = useState(props.translation);

	// Функция для перехода в режим редактирования
	const handleEditClick = () => {
		setIsEditing(true);
	};

	// Функция для отмены режима редактирования
	const handleCancelClick = () => {
		setIsEditing(false);
		// Сбрасываем текущие значения полей к последним сохраненным данным
		setStatusTheme(savedTheme);
		setStatusWord(savedWord);
		setStatusTranscription(savedTranscription);
		setStatusTranslation(savedTranslation);
	};

	// Функция для сохранения данных
	const handleSaveClick = () => {
		setIsEditing(false); // После сохранения возвращаемся в режим чтения
		// Сохраняем новые значения в строки таблицы из полей ввода
		setSavedTheme(statusTheme);
		setSavedWord(statusWord);
		setSavedTranscription(statusTranscription);
		setSavedTranslation(statusTranslation);
	};

	// Функции для обработки изменений в полях ввода
	const onStatusChangeTheme = (e) => {
		setStatusTheme(e.currentTarget.value);
	};
	const onStatusChangeWord = (e) => {
		setStatusWord(e.currentTarget.value);
	};
	const onStatusChangeTranscription = (e) => {
		setStatusTranscription(e.currentTarget.value);
	};
	const onStatusChangeTranslation = (e) => {
		setStatusTranslation(e.currentTarget.value);
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
							value={statusTheme}
							onChange={onStatusChangeTheme}
						/>
					</td>
					<td>
						<input
							className={styles.input__item}
							type="text"
							value={statusWord}
							onChange={onStatusChangeWord}
						/>
					</td>
					<td>
						<input
							className={styles.input__item}
							type="text"
							value={statusTranscription}
							onChange={onStatusChangeTranscription}
						/>
					</td>
					<td>
						<input
							className={styles.input__item}
							type="text"
							value={statusTranslation}
							onChange={onStatusChangeTranslation}
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
					<td>{statusTheme}</td>
					<td>{statusWord}</td>
					<td>{statusTranscription}</td>
					<td>{statusTranslation}</td>
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
