import { useState } from "react";
import styles from "./TextField.module.scss";

export function TextField() {
	const [inputText, setInputText] = useState(""); // Состояние для текста в поле ввода
	const [displayText, setDisplayText] = useState(""); // Состояние для отображаемого текста

	// Обработчик изменения текста в поле
	const handleInputChange = (e) => {
		setInputText(e.target.value);
	};

	// Обработчик нажатия на кнопку
	const handleButtonClick = () => {
		// Преобразуем текст в нижний регистр и устанавливаем в состояние для отображения
		setDisplayText(inputText.toLowerCase());
	};

	return (
		<div className={styles.container}>
			<input
				type="text"
				value={inputText}
				onChange={handleInputChange}
				className={styles.input__field}
				placeholder="Enter text"
			/>
			<button onClick={handleButtonClick} className={styles.button}>
				Show Text
			</button>

			{displayText && <p className={styles.display__text}>{displayText}</p>}
		</div>
	);
}
