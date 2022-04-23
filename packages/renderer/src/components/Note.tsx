import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// @ts-expect-error
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-expect-error
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkEmoji from "remark-emoji";
// @ts-expect-error
import remarkTypograf from "@mavrin/remark-typograf";
// import remarkDirective from "remark-directive";
// import rehypeRaw from "rehype-raw";
// import rehypeSanitize from "rehype-sanitize";
import remarkFrontmatter from "remark-frontmatter";
// import remarkYamlConfig from "remark-yaml-config";
// import remarkMdx from "remark-mdx";
import rehypeSlug from "rehype-slug";
import example from "../etc/tutorial";
import { useParams, Link } from "react-router-dom";

import "katex/dist/katex.min.css";
import "../styles/Note.css";

function Note() {
	const { id: ID } = useParams();
	const savedNote = localStorage.getItem(`notes:${ID!}`)!;

	const [lastBackup, setBackup] = useState(savedNote);

	const [text, setText] = useState(
		savedNote !== null ? savedNote : "# New notes"
	);
	const [edit, setEdit] = useState(false);

	const toggleEdit = () => {
		const saveTime = Math.round(new Date().getTime() / 1000);
		if (edit && lastBackup !== text) {
			localStorage.setItem(`notes@${saveTime}:${ID!}`, lastBackup || "");
			console.log(`Auto backup at ${saveTime} for ${ID}`);
			setBackup(text);
		}
		if (!edit) {
			try {
				setTimeout(() => textRef.current!.focus(), 50);
			} catch {}
		}
		setEdit((edit) => !edit);
	};

	const resizeText = () => {
		if (edit) localStorage.setItem(`notes:${ID!}`, text);

		const scrollLeft =
			window.pageXOffset ||
			(document.documentElement || document.body.parentNode || document.body)
				.scrollLeft;

		const scrollTop =
			window.pageYOffset ||
			(document.documentElement || document.body.parentNode || document.body)
				.scrollTop;

		try {
			textRef.current!.style.height = "auto";
			textRef.current!.style.height = textRef.current!.scrollHeight + "px";
		} catch (e) {}

		window.scrollTo(scrollLeft, scrollTop);
	};

	const textRef = useRef<HTMLTextAreaElement>(null);

	return (
		<div className="container">
			<div className="menu">
				<Link to="/">← Back</Link>
				<Link
					to=""
					onClick={() =>
						window.scrollTo({
							left: 0,
							top: document.body.scrollHeight,
							behavior: "smooth",
						})
					}
				>
					▼
				</Link>
				<Link to="" onClick={toggleEdit}>
					{edit ? "Done" : "Edit"}
				</Link>
			</div>
			{edit ? (
				<textarea
					onFocus={resizeText}
					onBlur={resizeText}
					className="editor"
					ref={textRef}
					// onDoubleClick={toggleEdit}
					onInput={(e) => {
						setText(e.currentTarget.value);
						if (e.currentTarget.value === "!!test") setText(example);
						resizeText();
					}}
					onKeyDown={(e) =>
						e.metaKey && (e.key === "Enter" || e.key === "s") && toggleEdit()
					}
					defaultValue={text}
				/>
			) : (
				<div onDoubleClick={() => savedNote === null && toggleEdit()}>
					<ReactMarkdown
						className="markdown"
						remarkPlugins={[
							remarkGfm,
							remarkMath,
							[remarkEmoji, { emoticon: true }],
							[remarkTypograf, { locale: ["en-US"] }],
							// remarkDirective,
							remarkFrontmatter,
							// remarkYamlConfig,
							// remarkMdx,
						]}
						rehypePlugins={[
							[rehypeKatex, { displayMode: true, trust: true }],
							rehypeSlug,
							// rehypeRaw,
							// rehypeSanitize,
						]}
						components={{
							code({ node, inline, className, children, ...props }) {
								const match = /language-(\w+)/.exec(className || "");
								return !inline ? (
									<SyntaxHighlighter
										children={String(children).replace(/\n$/, "")}
										style={oneDark}
										language={match?.[1]}
										PreTag="div"
										{...props}
									/>
								) : (
									<code className={className} {...props}>
										{children}
									</code>
								);
							},
							a({ href, node, ...props }) {
								return href?.match(/https?:\/\//) ? (
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										{...props}
									/>
								) : (
									<Link
										to={href!}
										onClick={() =>
											window.scrollTo({
												top:
													(document.getElementById(href!.substring(1))
														?.offsetTop! || 0) - 10,
												behavior: "smooth",
											})
										}
										{...props}
									/>
								);
							},
						}}
					>
						{text || "Double click to edit."}
					</ReactMarkdown>
					<div className="menu">
						<Link to={`/history/${ID}`}>History</Link>
						<Link
							to=""
							onClick={() =>
								window.scrollTo({
									left: 0,
									top: 0,
									behavior: "smooth",
								})
							}
						>
							▲
						</Link>
						<Link
							to="/"
							onClick={() => localStorage.removeItem(`notes:${ID!}`)}
						>
							Delete
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default Note;
