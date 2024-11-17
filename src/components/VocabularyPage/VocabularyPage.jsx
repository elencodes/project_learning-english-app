import { useContext, useState, useEffect } from "react";
import { TableRow } from "../TableRow/TableRow";
import { Form } from "../Form/Form";
import { WordsContext } from "../WordsContext/WordsContext";
import styles from "./VocabularyPage.module.scss";

export function VocabularyPage() {
	// Доступ к данным и функциям из контекста
	const { loadData, words, setWords, addWord } = useContext(WordsContext);

	// Состояние для текущей страницы и количество строк на странице
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 5;

	// Общее количество страниц
	const totalPages = Math.ceil(words.length / rowsPerPage);
	if (currentPage > totalPages && currentPage > 1) {
		setCurrentPage(currentPage - 1);
	}

	// Расчет индексов для отображаемых строк
	const startIndex = (currentPage - 1) * rowsPerPage;
	const endIndex = startIndex + rowsPerPage;
	const currentRows = words.slice(startIndex, endIndex);

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

	// Обработчик добавления новой строки
	const handleAdd = (newRow) => {
		// Проверка, что новое слово не дублируется
		const isDuplicate = words.some(
			(word) =>
				word.english === newRow.english && word.russian === newRow.russian
		);

		if (isDuplicate) {
			console.log("Duplicate word, not adding it.");
			return; // Если слово уже существует, не добавляем
		}

		const maxId = words.length
			? Math.max(...words.map((item) => item.id))
			: 0;
		const newId = maxId + 1; // Увеличиваем максимальный id на 1

		const updatedRow = {
			id: newId,
			tags: newRow.tags || "",
			english: newRow.english || "",
			transcription: newRow.transcription || "",
			russian: newRow.russian || "",
		};
		// Обновляем состояние данных с добавлением новой строки
		addWord(updatedRow);

		// После добавления проверим, нужно ли переключиться на последнюю страницу
		const newTotalPages = Math.ceil((words.length + 1) / rowsPerPage);
		if (currentPage !== totalPages) {
			setCurrentPage(newTotalPages); // Переход на последнюю страницу
		}
	};

	// Обработчик удаления строки
	const handleDelete = async (id) => {
		try {
			// Удаляем строку из API
			const response = await fetch(`/api/words/${id}/delete`, {
				method: "POST",
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			// Удаляем строку из состояния
			const updatedData = words.filter((row) => row.id !== id);
			setWords(updatedData); // Обновляем состояние в контексте
			loadData(); // Обновляем состояние в контексте

			// Если на последней странице больше нет строк, переключаемся на предыдущую страницу
			if (currentPage > Math.ceil(updatedData.length / rowsPerPage)) {
				setCurrentPage(currentPage - 1);
			}
		} catch (error) {
			console.error("Error deleting word:", error);
		}
	};

	useEffect(() => {
		// Если новое слово добавляется, нужно переключить на последнюю страницу
		if (
			words.length > 0 &&
			currentPage === totalPages &&
			words.length % rowsPerPage === 1
		) {
			setCurrentPage(totalPages + 1); // Переход на последнюю страницу
		}
	}, [words, totalPages, currentPage]);

	return (
		<>
			<main className="container">
				<h1 className={styles.title}>Vocabulary</h1>
				<Form handleAdd={handleAdd} />
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
								id={props.id} // Отображаем номер строки с учетом страницы
								tags={props.tags}
								english={props.english}
								transcription={props.transcription}
								russian={props.russian}
								onDelete={handleDelete}
							/>
						))}
					</tbody>
					<tfoot className={styles.table__footer}>
						<tr>
							<th className={styles.table__footer_text}>
								Total items:{" "}
								<span className={styles.table__footer_counter}>
									{words.length}
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
