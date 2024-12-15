import { observer } from "mobx-react-lite";
import { useThemeStore } from "../ThemeStoreContext/ThemeStoreContext";
import editIcon from "../../assets/icons/buttons/edit.svg";
import editIconDarkTheme from "../../assets/icons/buttons/edit-dark-theme.svg";
import deleteIcon from "../../assets/icons/buttons/delete.svg";
import styles from "./ReadMode.module.scss";

// Компонент режима чтения (ReadMode)
const ReadMode = observer(({ onEdit, onDelete }) => {
	// Получение ThemeStore
	const { themeStore } = useThemeStore();
	// Текущая тема (light или dark)
	const currentTheme = themeStore.theme;

	return (
		<>
			<button className={styles.edit__button} onClick={onEdit}>
				<img
					className={styles.edit__icon}
					src={currentTheme === "dark" ? editIconDarkTheme : editIcon}
					alt="edit"
				/>
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
});

export default ReadMode;
