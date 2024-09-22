import editIcon from "../../assets/icons/buttons/edit.svg";
import styles from "./EditButton.module.scss";

export function EditButton() {
	return (
		<>
			<div className={styles.edit__button}>
				<img className={styles.edit__icon} src={editIcon} alt="edit" />
				<p className={styles.edit__text}>Edit</p>
			</div>
		</>
	);
}
