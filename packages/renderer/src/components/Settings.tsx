import { EventHandler, useState } from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import styles from "../styles/Home.module.css";
function Home() {
	const settings = JSON.parse(
		localStorage.getItem("@simplinotes/settings") || "{}"
	);
	const [background, setBackground] = useState(settings?.background || "");
	const [color, setColor] = useState(settings?.color || "");

	const handleSave = () =>
		localStorage.setItem(
			"@simplinotes/settings",
			JSON.stringify({
				...settings,
				background,
				color: color !== "transparent" && color,
			})
		);

	const handleKeyDown = (e: any) => {
		if (e.key === "Enter") {
			handleSave();
		}
	};

	return (
		<div className="container">
			<div className={styles.main}>
				<div className="menu">
					<Link to="/">← Back</Link>
					<Link to="" onClick={handleSave}>
						Save
					</Link>
				</div>
				<h1>Settings</h1>
				<hr />
				<div className={styles.nodrag}>
					Background:
					<br />
					<input
						type="text"
						placeholder="rgba(0, 0, 0, 0.1)"
						style={{
							borderBottomColor:
								background !== "transparent" &&
								background !== settings?.background &&
								background,
						}}
						onChange={(e) => setBackground(e.target.value)}
						value={background}
						onKeyDown={handleKeyDown}
					/>
					<br />
					Text color:
					<br />
					<input
						type="text"
						placeholder="#edf2f4"
						style={{
							borderBottomColor: color !== "transparent" && color,
						}}
						onChange={(e) => setColor(e.target.value)}
						value={color}
						onKeyDown={handleKeyDown}
					/>
					<br />
					<input
						type="button"
						value="Clear all backups"
						onClick={() => {
							const backups = Object.keys(localStorage).filter((key) =>
								key.match(/^notes@\d+:[\w-]+/)
							);
							backups.map((key) => localStorage.removeItem(key));
							alert(`Cleared ${backups.length} backups`);
							console.log(`Cleared ${backups.length} backups`, backups);
						}}
					/>
					<input
						type="button"
						value="Clear settings"
						onClick={() => {
							localStorage.removeItem("@simplinotes/settings");
							alert("Cleared settings");
							console.log("Cleared settings");
						}}
					/>
					<input
						type="button"
						value="Clear all data"
						onClick={() => {
							const keys = Object.keys(localStorage);
							keys.map((key) => localStorage.removeItem(key));
							alert(`Cleared ${keys.length} data`);
							console.log(`Cleared ${keys.length} data`, keys);
						}}
					/>
					<input
						type="button"
						value="Export data"
						onClick={() => {
							const data = Object.keys(localStorage)
								.filter((key) => !key.match(/^notes@\d+:[\w-]+/))
								.map((key) => ({
									key,
									value: localStorage.getItem(key),
								}));
							navigator.clipboard
								.writeText(JSON.stringify(data))
								.then(() => {
									alert(`${data.length} data copied to clipboard`);
									console.log(`Copied ${data?.length} key-value pair`, data);
								})
								.catch((err) => alert(`Failed to copy data: ${err}`));
						}}
					/>
					<input
						type="button"
						value="Import data"
						onClick={() => {
							navigator.clipboard
								.readText()
								.then((data) => {
									try {
										const parsed = JSON.parse(data);
										console.log(`Received data: ${parsed}`);
										parsed.map(
											({ key, value }: { key: string; value: string }) =>
												localStorage.setItem(key, value)
										);
										alert(`Successfully imported ${parsed?.length} data`);
										console.log(
											`Imported ${parsed?.length} key-value pair`,
											parsed
										);
									} catch (e) {
										alert(`Failed to import data from clipboard: ${e}`);
									}
								})
								.catch((err) => alert(`Failed to read clipboard: ${err}`));
						}}
					/>
				</div>
				<hr />
				Refresh app to see the changes.
				<br />
				{(
					Object.entries(localStorage).reduce(
						(acc, [a, b]) => acc + a.length + b.length,
						0
					) / 1024
				).toPrecision(4)}{" "}
				KB / 5 MB of storage used
			</div>
		</div>
	);
}

export default Home;
