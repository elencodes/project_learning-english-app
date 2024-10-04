import gearIcon from "../../assets/icons/header/gear-header.svg";
import styles from "./Header.module.scss";

export function Header({ onVocabulary, onGame }) {
	return (
		<>
			<header className={styles.header}>
				<div className="container">
					<div className={styles.header__inner}>
						<nav className={styles.nav}>
							<a
								className={styles.nav__link}
								href={onVocabulary}
								onClick={onVocabulary}
							>
								Vocabulary
							</a>
							<a
								className={styles.nav__link}
								href={onGame}
								onClick={onGame}
							>
								Game
							</a>
						</nav>
						<div className={styles.settings__container}>
							<img
								className={styles.settings__icon}
								src={gearIcon}
								alt="gear"
							/>
							<p className={styles.settings__text}>Settings</p>
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
