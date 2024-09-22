import deleteIcon from "../../assets/icons/buttons/delete.svg";
import styles from "./DeleteButton.module.scss";

export function DeleteButton() {
	return (
		<>
			<div className={styles.delete__button}>
				<img className={styles.delete__icon} src={deleteIcon} alt="edit" />
			</div>
		</>
	);
}
