import gearIcon from "../../assets/icons/header/gear-header.svg";
import styles from "./Settings.module.scss";

export function Settings() {
	return (
		<>
			<div className={styles.settings__container}>
				<img className={styles.settings__icon} src={gearIcon} alt="gear" />
				<p className={styles.settings__text}>Settings</p>
			</div>
		</>
	);
}
