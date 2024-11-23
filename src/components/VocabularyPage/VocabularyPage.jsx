import { observer } from "mobx-react-lite";
import { reaction } from "mobx"; // Для отслеживания изменений состояния MobX
import { useStore } from "../WordsStoreContext/WordsStoreContext";
import { useState, useEffect } from "react";
import TableRow from "../TableRow/TableRow";
import Form from "../Form/Form";
import { Loader } from "../Loader/Loader";
import styles from "./VocabularyPage.module.scss";

const VocabularyPage = observer(() => {
	// Доступ к MobX-стору через контекст
	const { wordsStore } = useStore();

	// Локальное состояние для текущей страницы и количества строк на странице
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 5; // Количество строк на одной странице

	// Рассчитываем общее количество страниц на основе длины массива слов
	const totalPages = Math.ceil(wordsStore.words.length / rowsPerPage);

	// Убедимся, что текущая страница всегда валидна (например, при удалении последнего элемента)
	if (currentPage > totalPages && currentPage > 1) {
		setCurrentPage(currentPage - 1);
	}

	// Расчет индексов для отображаемых строк
	const startIndex = (currentPage - 1) * rowsPerPage;
	const endIndex = startIndex + rowsPerPage;
	const currentRows = wordsStore.words.slice(startIndex, endIndex);

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
	const handleAdd = async (newRow) => {
		// Проверяем, что добавляемое слово не является дубликатом
		const isDuplicate = wordsStore.words.some(
			(word) =>
				word.english === newRow.english && word.russian === newRow.russian
		);

		if (isDuplicate) {
			console.log("Duplicate word, not adding it.");
			return; // Если дубликат найден, не добавляем строку
		}

		// Добавляем новую строку через метод в MobX-сторе
		await wordsStore.handleAdd(newRow);

		// Рассчитываем новую последнюю страницу на основе обновленных данных
		const newTotalPages = Math.ceil(wordsStore.words.length / rowsPerPage);
		setCurrentPage(newTotalPages); // Устанавливаем последнюю страницу
	};

	// Обработчик удаления строки
	const handleDelete = async (id) => {
		// Вызываем метод из WordsStore для удаления строки по id
		await wordsStore.handleDelete(id);

		// Если на последней странице больше нет строк, переключаемся на предыдущую страницу
		const newTotalPages = Math.ceil(wordsStore.words.length / rowsPerPage);
		if (currentPage > newTotalPages && currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	// Загружаем данные только при монтировании компонента
	useEffect(() => {
		wordsStore.loadData().then(() => {
			// Устанавливаем первую страницу после загрузки данных
			setCurrentPage(1); // ВАЖНО: сброс на первую страницу
		});
	}, [wordsStore]);

	// Реакция на изменения длины массива words
	useEffect(() => {
		const disposer = reaction(
			() => wordsStore.words.length, // Отслеживаем длину массива
			(newLength) => {
				const newTotalPages = Math.ceil(newLength / rowsPerPage);
				setCurrentPage(newTotalPages); // Переход на последнюю страницу
			}
		);

		return () => disposer(); // Чистим реакцию при размонтировании
	}, [wordsStore, rowsPerPage]);

	return (
		<>
			<Loader isLoading={wordsStore.isLoading} error={wordsStore.error}>
				{wordsStore.error && (
					<p className="error__text">{wordsStore.error}</p>
				)}
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
							{currentRows.map((props) => (
								<TableRow
									key={props.id}
									id={props.id} // Отображаем номер строки с учетом страницы
									tags={props.tags}
									english={props.english}
									transcription={props.transcription}
									russian={props.russian}
									onDelete={() => handleDelete(props.id)}
								/>
							))}
						</tbody>
						<tfoot className={styles.table__footer}>
							<tr>
								<th className={styles.table__footer_text}>
									Total items:{" "}
									<span className={styles.table__footer_counter}>
										{wordsStore.words.length}
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
			</Loader>
		</>
	);
});

export default VocabularyPage;