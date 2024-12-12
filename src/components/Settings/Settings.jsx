import { useState, useEffect, useRef } from "react";
import { useThemeStore } from "../ThemeStoreContext/ThemeStoreContext";
import gearIcon from "../../assets/icons/header/gear-header.svg";
import styles from "./Settings.module.scss";

export function Settings() {
	const [isMenuOpen, setMenuOpen] = useState(false); // Состояние для отображения меню
	const { themeStore } = useThemeStore(); // Получение ThemeStore
	const menuRef = useRef(null); // Ссылка на контейнер меню

	// Функция для переключения темы
	const handleThemeChange = (theme) => {
		themeStore.setTheme(theme);
		setMenuOpen(false); // Закрываем меню после выбора
	};

	// Закрытие меню при клике вне области
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setMenuOpen(false); // Закрыть меню
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<>
			<div className={styles.settings} ref={menuRef}>
				<div
					className={styles.settings__container}
					onClick={() => setMenuOpen(!isMenuOpen)}
				>
					<img
						className={styles.settings__icon}
						src={gearIcon}
						alt="gear"
					/>
					<p className={styles.settings__text}>Settings</p>
				</div>
				{isMenuOpen && (
					<div className={styles.menu}>
						<button
							className={styles.menu__button}
							onClick={() => handleThemeChange("light")}
						>
							Light Theme
						</button>
						<button
							className={styles.menu__button}
							onClick={() => handleThemeChange("dark")}
						>
							Dark Theme
						</button>
					</div>
				)}
			</div>
		</>
	);
}
