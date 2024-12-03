import { useState } from "react";
import styles from "./Search.module.scss";

export const Search = ({ onSearch }) => {
	const [placeholder, setPlaceholder] = useState("Search words...");
	const [searchTerm, setSearchTerm] = useState("");

	const handleFocus = () => setPlaceholder("");
	const handleBlur = () => setPlaceholder("Search words...");

	// Обработчик изменения ввода
	const handleInputChange = (e) => {
		setSearchTerm(e.target.value); // Только обновляем локальное состояние
	};

	// Обработчик отправки формы
	const handleSearchSubmit = (e) => {
		e.preventDefault(); // Предотвращаем перезагрузку страницы
		onSearch(searchTerm); // Передаем текущий запрос в родительский компонент
	};

	return (
		<>
			<form
				className={styles.search__container}
				onSubmit={handleSearchSubmit}
			>
				<input
					className={styles.input__item}
					type="text"
					value={searchTerm}
					onChange={handleInputChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder={placeholder}
				/>
				<button className={styles.search__button} type="submit">
					<span className={styles.search__icon}></span>
				</button>
			</form>
		</>
	);
};
