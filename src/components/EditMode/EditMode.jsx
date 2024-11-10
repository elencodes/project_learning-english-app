import cancelIcon from "../../assets/icons/buttons/cancel.svg";
import saveIcon from "../../assets/icons/buttons/checkmark.svg";
import styles from "./EditMode.module.scss";

// Компонент режима редактирования (EditMode)
export function EditMode({ onCancel, onSave, isDisabled }) {
	return (
		<>
			<button className={styles.cancel__button} onClick={onCancel}>
				<img
					className={styles.cancel__icon}
					src={cancelIcon}
					alt="cancel"
				/>
			</button>
			<button
				className={styles.save__button}
				onClick={onSave}
				disabled={isDisabled}
			>
				<img className={styles.save__icon} src={saveIcon} alt="save" />
				<p className={styles.save__text}>Save</p>
			</button>
		</>
	);
}
