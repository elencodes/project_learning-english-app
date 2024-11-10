import editIcon from "../../assets/icons/buttons/edit.svg";
import deleteIcon from "../../assets/icons/buttons/delete.svg";
import styles from "./ReadMode.module.scss";

// Компонент режима чтения (ReadMode)
export function ReadMode({ onEdit, onDelete }) {
	return (
		<>
			<button className={styles.edit__button} onClick={onEdit}>
				<img className={styles.edit__icon} src={editIcon} alt="edit" />
				<p className={styles.edit__text}>Edit</p>
			</button>
			<button className={styles.delete__button} onClick={onDelete}>
				<img
					className={styles.delete__icon}
					src={deleteIcon}
					alt="delete"
				/>
			</button>
		</>
	);
}
