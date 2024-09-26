import { useState } from "react";
import { EditMode } from "../EditMode/EditMode";
import { ReadMode } from "../ReadMode/ReadMode";
import styles from "./TableRow.module.scss";

export function TableRow(props) {
	//управление состояниями ReadMode и EditMode
	const [isEditing, setIsEditing] = useState(false);

	//функция для перехода в режим редактирования
	const handleEditClick = () => {
		setIsEditing(true);
	};

	//функция для отмены режима редактирования
	const handleCancelClick = () => {
		setIsEditing(false);
	};

	//функция для сохранения данных
	const handleSaveClick = () => {
		setIsEditing(false); // После сохранения возвращаемся в режим чтения
	};

	return (
		<tr>
			<td>{props.id}</td>
			<td>{props.theme}</td>
			<td>{props.word}</td>
			<td>{props.transcription}</td>
			<td>{props.translation}</td>
			<td className={styles.table__actions}>
				<div className={styles.button__container}>
					{isEditing ? (
						<EditMode
							onCancel={handleCancelClick}
							onSave={handleSaveClick}
						/>
					) : (
						<ReadMode onEdit={handleEditClick} />
					)}
				</div>
			</td>
		</tr>
	);
}
