import { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";

function History() {
	const { id: ID, time } = useParams();
	const savedNote = localStorage.getItem(`notes@${time}:${ID!}`)!;

	return (
		<div className="container">
			<div className="menu">
				<Link to={`/history/${ID}`}>← Back</Link>
			</div>
			<div className="editor">{savedNote || "No note found"}</div>
		</div>
	);
}

export default History;
