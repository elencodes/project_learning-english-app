import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import styles from "./Table.module.scss";

export function Table() {
	const data = [
		{
			id: 1,
			theme: "weather",
			word: "thunderstorm",
			transcription: "[ ˈθʌndərstɔːrm ]",
			translation: "гроза",
		},
		{
			id: 2,
			theme: "weather",
			word: "fog",
			transcription: "[ ˈfɑːɡ ]",
			translation: "туман",
		},
		{
			id: 3,
			theme: "weather",
			word: "rain",
			transcription: "[ reɪn ]",
			translation: "дождь",
		},
		{
			id: 4,
			theme: "emotions",
			word: "curious",
			transcription: "[ ˈkjʊrɪəs ]",
			translation: "любопытный",
		},
		{
			id: 5,
			theme: "emotions",
			word: "excited",
			transcription: "[ ɪkˈsaɪtɪd ]",
			translation: "взволнованный",
		},
		{
			id: 6,
			theme: "emotions",
			word: "grateful",
			transcription: "[ ɡreɪtfl ]",
			translation: "благодарный",
		},
		{
			id: 7,
			theme: "travel",
			word: "island",
			transcription: "[ ˈaɪlənd]",
			translation: "остров",
		},
		{
			id: 8,
			theme: "travel",
			word: "showplace",
			transcription: "[ ˈʃəʊpleɪs ]",
			translation: "достопримечательность",
		},
	];

	return (
		<>
			<div className="container">
				<h1 className={styles.title}>Vocabulary</h1>
				<h2 className={styles.subtitle}>Words List</h2>
				<table className={styles.table} cellSpacing="0">
					<thead className={styles.table__header}>
						<tr>
							<th>№</th>
							<th>Theme</th>
							<th>Word</th>
							<th>Transcription</th>
							<th>Translation</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody className={styles.table__body}>
						{data.map((word) => (
							<tr>
								<td>{word.id}</td>
								<td>{word.theme}</td>
								<td>{word.word}</td>
								<td>{word.transcription}</td>
								<td>{word.translation}</td>
								<td className={styles.table__actions}>
									<div className={styles.button__container}>
										<EditButton /> <DeleteButton />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
