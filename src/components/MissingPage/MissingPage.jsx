import { Link } from "react-router-dom";
import errorImage from "../../assets/images/404.svg";
import styles from "./MissingPage.module.scss";

export function MissingPage() {
	return (
		<>
			<main className={styles.error__page}>
				<div className="container">
					<h1 className={styles.error__title}>Sorry, page not found</h1>
					<div className={styles.error__image_box}>
						<img
							className={styles.error__image}
							src={errorImage}
							alt="404"
						/>
					</div>
					<Link className={styles.error__button} to="/">
						<p className={styles.button__text}>Back</p>
					</Link>
				</div>
			</main>
		</>
	);
}
