import { Link } from "react-router-dom";
// @ts-ignore
import { v4 } from "uuid";
import styles from "../styles/Home.module.css";
function Home() {
	const notesList = Object.keys(localStorage).filter((key) =>
		key.startsWith("notes:")
	);

	return (
		<div className="container">
			<div className={styles.main}>
				<div className="menu">
					<h1>Simplinotes</h1>
					<Link to="/settings" style={{ fontSize: "3rem" }}>
						⚙
					</Link>
				</div>
				<Link to={`/note/${v4()}`}>New note ▶</Link>
				<hr />
				{notesList && notesList?.length > 0 ? (
					<>
						{notesList.map((noteID) => {
							const note = localStorage.getItem(noteID);
							const regTitle = /^---.*?<br>title: "([^"]+)"<br>.*?---/gim;
							const regSubtitle = /^---.*?<br>subtitle: "([^"]+)"<br>.*?---/gim;
							return (
								<Link
									to={`/note/${noteID.split("notes:")[1]}`}
									className={styles.link}
									key={noteID}
								>
									{note?.split("\n")[0].split("#")[1] ||
										regTitle.exec(note?.replace(/\n/gm, "<br>")!)?.[1] ||
										"Untitled"}
									<br />
									<span className={styles.desc}>
										{regSubtitle.exec(note?.replace(/\n/gm, "<br>")!)?.[1] ||
											note
												?.replace(note?.split("\n")[0], "")
												.slice(0, 50)
												.replace(/^\s+/, "") ||
											"No additional text"}
									</span>
								</Link>
							);
						})}
					</>
				) : (
					<p>You currently have no notes</p>
				)}
			</div>
		</div>
	);
}

export default Home;
