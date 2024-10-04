import { Card } from "../Card/Card";
import data from "../../data/data.json";
import styles from "./GamePage.module.scss";

export function GamePage() {
	return (
		<>
			<div className="container">
				<h1 className={styles.title}>Game</h1>
				<div className={styles.card__list}>
					{data.map((props, index) =>
						index === 0 ? (
							<Card
								key={props.id}
								word={props.word}
								transcription={props.transcription}
								translation={props.translation}
							/>
						) : (
							console.log("Данные отсутствуют")
						)
					)}
				</div>
			</div>
		</>
	);
}
