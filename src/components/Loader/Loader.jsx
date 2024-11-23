import styles from "./Loader.module.scss";

export function Loader({ isLoading, error, children }) {
	if (error) {
		return <p className="error__text">{error}</p>;
	}
	if (isLoading) {
		return (
			<>
				<div className={styles.container}>
					<div className={styles.loader}>
						<div className={`${styles.inner} ${styles.one}`}></div>
						<div className={`${styles.inner} ${styles.two}`}></div>
						<div className={`${styles.inner} ${styles.three}`}></div>
					</div>
				</div>
			</>
		);
	}
	return children;
}
