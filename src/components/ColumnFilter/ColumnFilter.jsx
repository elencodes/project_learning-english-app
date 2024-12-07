import styles from "./ColumnFilter.module.scss";

export const ColumnFilter = ({
	options, // Список опций для фильтрации (например, темы)
	selectedOptions, // Массив выбранных опций
	onChange, // Функция, вызываемая при выборе/снятии опции
	onClear, // Функция для сброса фильтрации
}) => {
	return (
		<>
			<div className={styles.filter__container}>
				<ul>
					{options.map((option) => (
						<li className={styles.filter__item} key={option}>
							<label className={styles.filter__label}>
								<input
									className={styles.filter__checkbox}
									type="checkbox"
									checked={selectedOptions.includes(option)}
									onChange={() => onChange(option)}
								/>
								{option}
							</label>
						</li>
					))}
				</ul>
				<button className={styles.filter__button} onClick={onClear}>
					<p className={styles.button__text}>Clear Filter</p>
				</button>
			</div>
		</>
	);
};
