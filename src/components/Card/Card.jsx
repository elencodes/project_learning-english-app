import { useState } from "react";
import styles from "./Card.module.scss";

export function Card({
	className,
	word,
	transcription,
	translation,
	onShowTranslation,
}) {
	const [isClicked, setIsClicked] = useState(false);

	// Функция для показа перевода
	const handleClick = () => {
		if (!isClicked) {
			setIsClicked(true);
			onShowTranslation(); // Увеличиваем счетчик переводов
		}
	};

	return (
		<>
			<article className={`${styles.card} ${className}`}>
				<p className={styles.card__title}>{word}</p>
				<p className={styles.card__subtitle}>{transcription}</p>
				{isClicked ? (
					<p className={styles.card__text}>{translation}</p>
				) : (
					<button className={styles.card__button} onClick={handleClick}>
						<p className={styles.button__text}>Translate</p>
					</button>
				)}
			</article>
		</>
	);
}
