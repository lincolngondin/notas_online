import React, {useState} from 'react';
import {addNote} from '../db/crud.js'

const NoteMakePage = (props)=>{
	const [nome, setNome] = useState('');
	const [nota, setNota] = useState('');
	const [buttonState, setButtonState] = useState(true);
	const limiteNota = 250;

	const salvarNota = async (e)=>{
		e.preventDefault();
		setButtonState(false);
		await addNote(nome, nota, props.session.user);
		setNota('');
		setNome('');
		setButtonState(true);
		console.log(nome, nota)
	}

	function handleInputNome(e){
		const texto = e.target.value;
		if(texto.length <= 20)
			setNome(texto);
	}
	function handleInputNota(e){
		const texto = e.target.value; 
		if(texto.length <= limiteNota)
			setNota(texto);
	}

	return (
		<div className="notemake">
			<button className="notemake__viewer" onClick={()=>{
				props.changeToViewer();
			}}>Ver Minhas Notas</button>
			<button className="notemake__logout" onClick={()=>{
				props.updateSession({user:''});
				props.autenticar(false);
			}}>Sair</button>
			<form className="notemake__form">
				<p className="notemake__labels">Nome da nota</p>
				<input value={nome} onChange={handleInputNome} className="notemake__input" required type="text" name="nome-nota"/>
				<p className="notemake__labels">Conteudo</p>
				<div className="notemake__text__container">
					<textarea value={nota} onChange={handleInputNota} name="nota" required className="notemake__text"></textarea>
					<p className="notemake__text__lengthtext">{nota.length}/{limiteNota}</p>
				</div>
				<button disabled={!buttonState} onClick={salvarNota} className="notemake__button">Salvar Nota</button>
			</form>
		</div>
	);
}

export default NoteMakePage;