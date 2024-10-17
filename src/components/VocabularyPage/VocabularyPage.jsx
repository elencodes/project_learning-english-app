import { useState } from "react";
import { TableRow } from "../TableRow/TableRow";
import data from "../../data/data.json";
import styles from "./VocabularyPage.module.scss";

export function VocabularyPage() {
	// Управление состоянием текущей страницы и определяем количество строк на странице
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 5;

	// Определение общего количества страниц
	const totalPages = Math.ceil(data.length / rowsPerPage);

	// Расчет индексов для отображаемых строк
	const startIndex = (currentPage - 1) * rowsPerPage;
	const endIndex = startIndex + rowsPerPage;
	const currentRows = data.slice(startIndex, endIndex);

	// Обработчик для перехода на следующую страницу
	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	// Обработчик для перехода на предыдущую страницу
	const handlePrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<>
			<main className="container">
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
						{currentRows.map((props, index) => (
							<TableRow
								key={props.id}
								id={startIndex + index + 1} // Отображаем номер строки с учетом страницы
								theme={props.theme}
								word={props.word}
								transcription={props.transcription}
								translation={props.translation}
							/>
						))}
					</tbody>
					<tfoot className={styles.table__footer}>
						<tr>
							<th className={styles.table__footer_text}>
								Total items:{" "}
								<span className={styles.table__footer_counter}>
									{data.length}
								</span>
							</th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
							<th>
								<div className={styles.pagination}>
									<button
										className={styles.paginationButton}
										onClick={handlePrevPage}
										disabled={currentPage === 1}
									>
										⮜
									</button>
									<span className={styles.pageInfo}>
										{" "}
										<span className={styles.pageInfo_currentPage}>
											{currentPage}
										</span>{" "}
										of {totalPages}
									</span>
									<button
										className={styles.paginationButton}
										onClick={handleNextPage}
										disabled={currentPage === totalPages}
									>
										⮞
									</button>
								</div>
							</th>
						</tr>
					</tfoot>
				</table>
			</main>
		</>
	);
}
