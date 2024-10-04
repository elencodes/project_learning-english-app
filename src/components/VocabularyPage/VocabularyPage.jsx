import { TableRow } from "../TableRow/TableRow";
import data from "../../data/data.json";
import styles from "./VocabularyPage.module.scss";

export function VocabularyPage() {
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
						{data.map((props) => (
							<TableRow
								key={props.id}
								id={props.id}
								theme={props.theme}
								word={props.word}
								transcription={props.transcription}
								translation={props.translation}
							/>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
