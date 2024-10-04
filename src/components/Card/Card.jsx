import { useState } from "react";
import styles from "./Card.module.scss";

export function Card(props) {
	const [isClicked, setIsClicked] = useState(false);

	//функция для показа перевода
	const handleClick = () => {
		setIsClicked(true);
	};

	return (
		<>
			<div className={styles.card}>
				<p className={styles.card__title}>{props.word}</p>
				<p className={styles.card__subtitle}>{props.transcription}</p>
				{isClicked ? (
					<p className={styles.card__text}>{props.translation}</p>
				) : (
					<button className={styles.card__button} onClick={handleClick}>
						<p className={styles.button__text}>Translate</p>
					</button>
				)}
			</div>
		</>
	);
}
