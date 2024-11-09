import { useState } from "react";
import styles from "./Form.module.scss";

export function Form(handleAdd) {
	// Управление состоянием добавления новой	темы
	const [formValue, setFormValue] = useState({
		theme: "",
		word: "",
		transcription: "",
		translation: "",
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormValue({
			...formValue,
			[name]: value,
		});
	};

	const addNewWord = (e) => {
		e.preventDefault();
		handleAdd(formValue);
		setFormValue({ theme: "", word: "", transcription: "", translation: "" });
	};

	return (
		<>
			<form className={styles.form__container}>
				<label>Theme</label>
				<input
					className={styles.input__item}
					type="text"
					name="theme"
					value={formValue.theme}
					onChange={handleChange}
				/>
				<label>Word</label>
				<input
					className={styles.input__item}
					type="text"
					name="word"
					value={formValue.word}
					onChange={handleChange}
				/>
				<label>Transcription</label>
				<input
					className={styles.input__item}
					type="text"
					name="transcription"
					value={formValue.transcription}
					onChange={handleChange}
				/>
				<label>Translation</label>
				<input
					className={styles.input__item}
					type="text"
					name="translation"
					value={formValue.translation}
					onChange={handleChange}
				/>
				<button
					className={styles.form__button}
					type="submit"
					onClick={addNewWord}
				>
					<p className={styles.button__text}>+ Add</p>
				</button>
			</form>
		</>
	);
}
