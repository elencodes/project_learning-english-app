import { useState } from "react";
import { EditMode } from "../EditMode/EditMode";
import { ReadMode } from "../ReadMode/ReadMode";
import data from "../../data/data.json";
import styles from "./Table.module.scss";

export function Table() {
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
		<>
			<div className="container">
				<h1 className={styles.title}>Vocabulary</h1>
				<h2 className={styles.subtitle}>Words List</h2>
				<table className={styles.table} cellSpacing="0">
					<thead className={styles.table__header}>
						<tr>
							<th>№</th>
							<th>Theme</th>
							<th>Word</th>
							<th>Transcription</th>
							<th>Translation</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody className={styles.table__body}>
						{data.map((word) => (
							<tr key={word.id}>
								<td>{word.id}</td>
								<td>{word.theme}</td>
								<td>{word.word}</td>
								<td>{word.transcription}</td>
								<td>{word.translation}</td>
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
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
