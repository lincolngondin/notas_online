import React, {useState, useEffect} from 'react';
import {readNotes} from '../db/crud.js';
import Note from './Note';

export default function NoteViewer(props){
	const [notas, setNotas] = useState([]);
	
	const generateNotes = ()=>{readNotes(props.session.user)
		.then((value)=>{
			const temp = value.map((data)=>{
				return (
					<Note user={data.data().criador} title={data.data().nomeDaNota} note={data.data().conteudo}/>
				);
			});
			setNotas(temp);
			console.log(temp);
		})
		.catch((e)=>console.log(e));

	}
	useEffect(generateNotes, []);
	
	return (
		<div className="note-view__container">
			{notas}
			<button className="note-view__button" onClick={props.changeToEditor}>Criar Nota</button>
		</div>
	);
}