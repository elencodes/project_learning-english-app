import { useState } from "react";
import { EditMode } from "../EditMode/EditMode";
import { ReadMode } from "../ReadMode/ReadMode";
import styles from "./TableRow.module.scss";

export function TableRow(props) {
	//управление состояниями ReadMode и EditMode
	const [isEditing, setIsEditing] = useState(false);

	//управление состояниями полей ввода
	const [statusTheme, setStatusTheme] = useState(props.theme);
	const [statusWord, setStatusWord] = useState(props.word);
	const [statusTranscription, setStatusTranscription] = useState(
		props.transcription
	);
	const [statusTranslation, setStatusTranslation] = useState(
		props.translation
	);

	//функция для перехода в режим редактирования
	const handleEditClick = () => {
		setIsEditing(true);
	};

	//функция для отмены режима редактирования
	const handleCancelClick = () => {
		setIsEditing(false);
		// Сбрасываем состояния к исходным значениям, переданным через props
		setStatusTheme(props.theme);
		setStatusWord(props.word);
		setStatusTranscription(props.transcription);
		setStatusTranslation(props.translation);
	};

	//функция для сохранения данных
	const handleSaveClick = () => {
		setIsEditing(false); // После сохранения возвращаемся в режим чтения
	};

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
							value={statusTheme || props.theme}
							onChange={onStatusChangeTheme}
						/>
					</td>
					<td>
						<input
							className={styles.input__item}
							type="text"
							value={statusWord || props.word}
							onChange={onStatusChangeWord}
						/>
					</td>
					<td>
						<input
							className={styles.input__item}
							type="text"
							value={statusTranscription || props.transcription}
							onChange={onStatusChangeTranscription}
						/>
					</td>
					<td>
						<input
							className={styles.input__item}
							type="text"
							value={statusTranslation || props.translation}
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
					<td>{props.theme}</td>
					<td>{props.word}</td>
					<td>{props.transcription}</td>
					<td>{props.translation}</td>
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
