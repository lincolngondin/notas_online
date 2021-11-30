import React from "react";

export default function Note({user, note, title}){
	return (
		<div className="note__container">
			<h1 className="note__title">{title}</h1>
			<p className="note__content">{note}</p>
		</div>
	);
}