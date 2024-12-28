import { observer } from "mobx-react-lite";
import { reaction } from "mobx"; // Для отслеживания изменений состояния MobX
import { useStore } from "../WordsStoreContext/WordsStoreContext";
import { useThemeStore } from "../ThemeStoreContext/ThemeStoreContext";
import { useState, useEffect } from "react";
import TableRow from "../TableRow/TableRow";
import Form from "../Form/Form";
import { Loader } from "../Loader/Loader";
import { Search } from "../Search/Search";
import { ColumnFilter } from "../ColumnFilter/ColumnFilter";
import filterIcon from "../../assets/icons/filter/filter.svg";
import filterActiveIcon from "../../assets/icons/filter/filter-active.svg";
import filterIconDarkTheme from "../../assets/icons/filter/filter-dark-theme.svg";
import filterActiveIconDarkTheme from "../../assets/icons/filter/filter-active-dark-theme.svg";
import styles from "./VocabularyPage.module.scss";

const VocabularyPage = observer(() => {
	// Доступ к MobX-стору через контекст
	const { wordsStore } = useStore();

	// Получение ThemeStore
	const { themeStore } = useThemeStore();
	// Текущая тема (light или dark)
	const currentTheme = themeStore.theme;

	// Локальное состояние для управления фильтром
	const [isFilterOpen, setFilterOpen] = useState(false); // Открытие списка фильтра
	// Уникальные темы для фильтрации
	const uniqueThemes = [...new Set(wordsStore.words.map((word) => word.tags))];

	// Локальное состояние для текущей страницы и количества строк на странице
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = window.innerWidth < 770 ? 3 : 5; // Изменяем количество строк на одной странице в зависимости от ширины экрана

	// Рассчитываем общее количество страниц на основе длины массива слов
	const totalPages = Math.ceil(
		(wordsStore.selectedThemes.length > 0 || wordsStore.searchQuery
			? wordsStore.filteredWords.length // Если фильтр активен или у поискового запроса есть значения, берём длину filteredWords
			: wordsStore.words.length) / // Если фильтр неактивен или запрос пустой, берём длину words
			rowsPerPage
	);

	// Расчет индексов для отображаемых строк
	const startIndex = (currentPage - 1) * rowsPerPage;
	const endIndex = startIndex + rowsPerPage;
	const currentRows = wordsStore.filteredWords.slice(startIndex, endIndex);

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

	// Обработчик поиска
	const handleSearch = (query) => {
		wordsStore.handleSearch(query); // Здесь вызывается логика поиска из wordsStore
	};

	// Обработчик изменения выбранных тем фильтра
	const handleThemeChange = (theme) => {
		// Проверяем, есть ли уже эта тема в выбранных
		const newSelectedThemes = wordsStore.selectedThemes.includes(theme)
			? wordsStore.selectedThemes.filter((t) => t !== theme) // Если тема есть, убираем её
			: [...wordsStore.selectedThemes, theme]; // Если темы нет, добавляем её

		// Применяем обновлённый список выбранных тем к фильтру
		wordsStore.applyThemeFilter(newSelectedThemes);
	};

	// Обработчик очистки фильтра
	const clearFilter = () => {
		// Сбрасываем выбранные темы и показываем все элементы
		wordsStore.clearThemeFilter();
	};

	useEffect(() => {
		// Убедимся, что currentPage не превышает totalPages
		if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

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

	useEffect(() => {
		const handleResize = () => window.innerWidth < 770;
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			<Loader isLoading={wordsStore.isLoading} error={wordsStore.error}>
				{wordsStore.error && (
					<p className="error__text">{wordsStore.error}</p>
				)}
				<div className="container">
					<main>
						<h1 className={styles.title}>Vocabulary</h1>
						<Form handleAdd={handleAdd} />
						<div className={styles.search__container}>
							<h2 className={styles.subtitle}>Words List</h2>
							<Search onSearch={handleSearch} />
						</div>
						{window.innerWidth >= 770 ? (
							<>
								<table className={styles.table} cellSpacing="0">
									<thead className={styles.table__header}>
										<tr>
											<th>№</th>
											<th>
												Theme{" "}
												{isFilterOpen ? (
													<>
														<button
															className={`${styles.filter__button} ${styles.active}`}
															onClick={() =>
																setFilterOpen(!isFilterOpen)
															}
														>
															<img
																className={styles.filter__icon}
																src={
																	currentTheme === "dark"
																		? filterActiveIconDarkTheme
																		: filterActiveIcon
																}
																alt="filterActiveIcon"
															/>
														</button>
													</>
												) : (
													<>
														<button
															className={styles.filter__button}
															onClick={() =>
																setFilterOpen(!isFilterOpen)
															}
														>
															<img
																className={styles.filter__icon}
																src={
																	currentTheme === "dark"
																		? filterIconDarkTheme
																		: filterIcon
																}
																alt="filterIcon"
															/>
														</button>
													</>
												)}
												{isFilterOpen && (
													<ColumnFilter
														options={uniqueThemes}
														selectedOptions={
															wordsStore.selectedThemes
														}
														onChange={handleThemeChange}
														onClear={clearFilter}
													/>
												)}
											</th>
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
												isCardView={window.innerWidth < 770}
											/>
										))}
									</tbody>
									<tfoot className={styles.table__footer}>
										<tr>
											<th className={styles.table__footer_text}>
												Total items:{" "}
												<span
													className={styles.table__footer_counter}
												>
													{
														wordsStore.selectedThemes.length >
															0 || wordsStore.searchQuery
															? wordsStore.filteredWords.length // Если фильтр активен или у поискового запроса есть значения, берём длину filteredWords
															: wordsStore.words.length // Если фильтр неактивен или запрос пустой, берём длину words
													}
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
														&#11164;
													</button>
													<span className={styles.pageInfo}>
														<span
															className={
																styles.pageInfo_currentPage
															}
														>
															{currentPage}
														</span>{" "}
														of {totalPages}
													</span>
													<button
														className={styles.paginationButton}
														onClick={handleNextPage}
														disabled={currentPage === totalPages}
													>
														&#11166;
													</button>
												</div>
											</th>
										</tr>
									</tfoot>
								</table>
							</>
						) : (
							<>
								<div className={styles.card__container}>
									{currentRows.map((props) => (
										<TableRow
											key={props.id}
											id={props.id} // Отображаем номер строки с учетом страницы
											tags={props.tags}
											english={props.english}
											transcription={props.transcription}
											russian={props.russian}
											onDelete={() => handleDelete(props.id)}
											isCardView={window.innerWidth < 770}
										/>
									))}
								</div>
							</>
						)}
					</main>
					<footer className={`${styles.footer} ${styles.footer__card}`}>
						<div className={styles.footer__text}>
							<span
								className={`${styles.footer__text_total} ${styles.total}`}
							>
								Total items:{" "}
							</span>
							<span className={styles.table__footer_counter}>
								{
									wordsStore.selectedThemes.length > 0 ||
									wordsStore.searchQuery
										? wordsStore.filteredWords.length // Если фильтр активен или у поискового запроса есть значения, берём длину filteredWords
										: wordsStore.words.length // Если фильтр неактивен или запрос пустой, берём длину words
								}
							</span>
						</div>
						<div className={styles.pagination}>
							<button
								className={`${styles.paginationButton} ${styles.pagination__prev}`}
								onClick={handlePrevPage}
								disabled={currentPage === 1}
							>
								&#11164;
							</button>
							<span
								className={`${styles.pageInfo} ${styles.pageInfo__cards}`}
							>
								<span className={styles.pageInfo_currentPage}>
									{currentPage}
								</span>{" "}
								of {totalPages}
							</span>
							<button
								className={`${styles.paginationButton} ${styles.pagination__next}`}
								onClick={handleNextPage}
								disabled={currentPage === totalPages}
							>
								&#11166;
							</button>
						</div>
					</footer>
				</div>
			</Loader>
		</>
	);
});

export default VocabularyPage;
