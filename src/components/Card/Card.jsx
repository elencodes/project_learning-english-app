import { useState } from "react";
import styles from "./Card.module.scss";

export function Card({
	className,
	english,
	transcription,
	russian,
	onShowTranslation,
	translateButtonRef,
}) {
	const [isClicked, setIsClicked] = useState(false);

	// Функция для показа перевода
	const handleClick = (event) => {
		// Проверка на нажатие клавиши Enter или на клик мышью
		if (!isClicked && (event.type === "click" || event.key === "Enter")) {
			setIsClicked(true);
			onShowTranslation(); // Увеличиваем счетчик переводов
		}
	};

	return (
		<>
			<article className={`${styles.card} ${className}`}>
				<p className={styles.card__title}>{english}</p>
				<p className={styles.card__subtitle}>{transcription}</p>
				{isClicked ? (
					<p className={styles.card__text}>{russian}</p>
				) : (
					<button
						ref={translateButtonRef}
						className={styles.card__button}
						onClick={handleClick}
						onKeyDown={(event) => {
							if (event.key === "Enter") handleClick(event);
						}}
					>
						<p className={styles.button__text}>Translate</p>
					</button>
				)}
			</article>
		</>
	);
}
