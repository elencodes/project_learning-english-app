import { useEffect } from "react";
import { useState } from "react";
import { Card } from "../Card/Card";
import data from "../../data/data.json";
import styles from "./GamePage.module.scss";
import Confetti from "react-confetti";

export function GamePage({ initialIndex = 0, words = data }) {
	// Отслеживаем изменение индекса текущей карточки
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	// Отслеживаем изменение счетчика переводов
	const [translationCount, setTranslationCount] = useState(0);

	// Отслеживаем изменение состояния эффекта конфетти
	const [uiProps, SetUiProps] = useState({ showConfetti: false });

	// Управление состоянием всплывающего уведомления
	const [showNotification, setShowNotification] = useState(false);

	// Переменные для первой и последней карточки из массива слов
	const firstCard = currentIndex === 0;
	const lastCard = currentIndex === words.length - 1;

	// Обработчик для перехода к следующей карточке
	// Проверяем, не достигли ли мы конца массива (currentIndex < words.length - 1).
	// Если да, то увеличиваем индекс на 1.
	const handleClickNext = () => {
		if (currentIndex < words.length - 1) {
			setCurrentIndex((prevIndex) => prevIndex + 1);
		}
	};

	// Обработчик для перехода к предыдущей карточке
	// Проверяем, не находимся ли мы в начале массива (currentIndex > 0).
	// Если да, то уменьшаем индекс на 1.
	const handleClickPrev = () => {
		if (currentIndex > 0) {
			setCurrentIndex((prevIndex) => prevIndex - 1);
		}
	};

	// Функция для увеличения счетчика переводов
	const incrementTranslationCount = () => {
		setTranslationCount((prevCount) => prevCount + 1);
	};

	// Проверка, завершена ли игра
	useEffect(() => {
		if (translationCount === words.length) {
			// Показываем конфетти
			SetUiProps({ showConfetti: true });
			// Показываем уведомление об успешном прохождении через 1 секунду
			setTimeout(() => {
				setShowNotification(true);
			}, 800);
		}
	}, [translationCount, words.length]);

	// Остановка эффекта конфетти через 7 секунд
	useEffect(() => {
		uiProps.showConfetti &&
			setTimeout(() => {
				SetUiProps({ ...uiProps, showConfetti: false });
			}, 7000);
	}, [uiProps]);

	// Функция для закрытия уведомления
	const closeNotification = () => {
		setShowNotification(false);
	};

	// Если массив слов пустой, показываем сообщение
	if (!words || words.length === 0) {
		return <p className={styles.message}>No words available</p>;
	}

	return (
		<>
			<main className="container">
				{uiProps.showConfetti && <Confetti />}
				<section className={styles.section}>
					<h1 className={styles.title}>Game</h1>
					<div className={styles.subtitle}>
						<p className={styles.counter__text}>
							Learned words:
							<span
								className={
									translationCount > 0
										? `${styles.translate__counter} ${styles.active}`
										: `${styles.translate__counter}`
								}
							>
								ㅤ{translationCount}
							</span>
						</p>
					</div>

					<div className={styles.section__card_container}>
						{words.map((props, cardIndex) => {
							let position = styles.nextSlide;

							if (cardIndex === currentIndex) {
								position = styles.activeSlide;
							} else if (
								cardIndex === currentIndex - 1 ||
								(currentIndex === 0 && cardIndex === words.length - 1)
							) {
								position = styles.lastSlide;
							}

							return (
								<Card
									className={`${styles.card} ${position}`}
									key={props.id}
									word={props.word}
									transcription={props.transcription}
									translation={props.translation}
									onShowTranslation={incrementTranslationCount} // передаем функцию
								/>
							);
						})}

						<button
							className={
								firstCard
									? `${styles.prev} ${styles.disabled}`
									: `${styles.prev}`
							}
							onClick={handleClickPrev}
							disabled={firstCard}
						>
							←
						</button>
						<button
							className={
								lastCard
									? `${styles.next} ${styles.disabled}`
									: `${styles.next}`
							}
							onClick={handleClickNext}
							disabled={lastCard}
						>
							→
						</button>
					</div>

					<div className={styles.counter__container}>
						<p className={styles.counter__card_text}>
							{currentIndex + 1} / {words.length}
						</p>
					</div>
				</section>

				{showNotification && (
					<div className={styles.notification}>
						<p
							className={`${styles.notification__text} ${styles.text__alert}`}
						>
							Congratulations!
						</p>
						<p className={styles.notification__text}>
							You have{" "}
							<span className={styles.text__complete}>completed</span>{" "}
							the game!
						</p>
						<button
							className={styles.closeButton}
							onClick={closeNotification}
						>
							&times;
						</button>
					</div>
				)}
			</main>
		</>
	);
}
