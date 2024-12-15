import { Link } from "react-router-dom";
import Settings from "../Settings/Settings";
import logo from "../../assets/icons/header/logo.svg";
import styles from "./Header.module.scss";

export function Header() {
	return (
		<>
			<header className={styles.header}>
				<div className="container">
					<div className={styles.header__inner}>
						<div className={styles.header__navigation_box}>
							<Link to="/" className={styles.header__navigation_logo}>
								<div className={styles.header__image_box}>
									<img
										className={styles.header__logo}
										src={logo}
										alt="logo"
									/>
								</div>
								<div className={styles.header__logoname_box}>
									<p className={styles.header__logoname}>Learning</p>
									<p className={styles.header__logoname}>Languages</p>
								</div>
							</Link>
							<nav className={styles.nav}>
								<Link className={styles.nav__link} to="/">
									Vocabulary
								</Link>
								<Link className={styles.nav__link} to="/game">
									Game
								</Link>
							</nav>
						</div>
						<Settings />
					</div>
				</div>
			</header>
		</>
	);
}
