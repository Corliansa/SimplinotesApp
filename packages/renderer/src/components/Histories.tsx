import { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Histories() {
	const getNumber = (str: string): number =>
		Number(str?.split(":")?.[0]?.split("@")?.[1] || 0);

	const { id: ID } = useParams();
	const notesList = Object.keys(localStorage)
		.filter((key) => key.startsWith("notes@") && key.endsWith(`:${ID!}`))
		.sort((a: string, b: string) => getNumber(a) - getNumber(b));
	const [time, setTime] = useState(
		getNumber(notesList?.[notesList.length - 1])
	);
	const savedNote = localStorage.getItem(`notes@${time}:${ID!}`)!;

	return (
		<div className="container">
			<div className="menu">
				<Link to={`/note/${ID}`}>← Back</Link>
			</div>
			{notesList.length > 0 ? (
				<div className="dynamic" style={{ marginBottom: 8 }}>
					<div className="notes-list">
						Timestamp
						<hr />
						{notesList.reverse().map((key) => {
							const time = getNumber(key);
							return (
								<div key={key}>
									<Link to="" onClick={() => setTime(time)}>
										{new Date(time * 1000).toLocaleString("en-UK")}
									</Link>
									<Link to={`/history/${ID}/${time}`}> ⮕</Link>
								</div>
							);
						})}
					</div>
					{ID && time && <div className="editor side">{savedNote}</div>}
				</div>
			) : (
				<div className="editor" style={{ padding: 2, marginBottom: 4 }}>
					No histories found.
				</div>
			)}
		</div>
	);
}

export default Histories;
