import { observer } from "mobx-react-lite";
import { useState, useEffect, useRef } from "react";
import { useThemeStore } from "../ThemeStoreContext/ThemeStoreContext";
import gearIcon from "../../assets/icons/header/gear-header.svg";
import gearActiveIcon from "../../assets/icons/header/gear-active.svg";
import gearActiveIconDarkTheme from "../../assets/icons/header/gear-active-dark-theme.svg";
import styles from "./Settings.module.scss";

const Settings = observer(() => {
	const [isMenuOpen, setMenuOpen] = useState(false); // Состояние для отображения меню
	const [isHovered, setHovered] = useState(false); // Состояние hover
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

	// Вычисляем, какую иконку использовать
	const getIcon = () => {
		if (isMenuOpen || isHovered) {
			return themeStore.theme === "dark"
				? gearActiveIconDarkTheme
				: gearActiveIcon;
		}
		return gearIcon;
	};

	return (
		<>
			<div className={styles.settings} ref={menuRef}>
				<div
					className={styles.settings__container}
					onClick={() => setMenuOpen(!isMenuOpen)}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
				>
					<img
						className={styles.settings__icon}
						src={getIcon()}
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
							<p className={`${styles.menu__text} ${styles.light}`}>
								Light Theme
							</p>
						</button>
						<button
							className={styles.menu__button}
							onClick={() => handleThemeChange("dark")}
						>
							<p className={`${styles.menu__text} ${styles.dark}`}>
								Dark Theme
							</p>
						</button>
					</div>
				)}
			</div>
		</>
	);
});

export default Settings;
