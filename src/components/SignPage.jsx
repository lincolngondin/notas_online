import React, {useState} from 'react';
import { addUser, checkUser } from '../db/crud.js';

export default function SignPage(props){
	const [name, setName] = useState('');
	const [senha, setSenha] = useState('');
	const [enabledButton, setEnabledButton] = useState(true);

	const criarConta = async ()=>{
		if(name.length<5){
			alert("O nome de usuario deve ter no minimo cinco caracteres!");
			return;
		}
		if(senha.length<5){
			alert("A senha deve ter no minimo cinco caracteres!");
			return;
		}
		setEnabledButton(false);
		const usuarioExiste = await checkUser(name);
		if(usuarioExiste){
			alert("Nome de usuario já está sendo utilizado!");
		}
		else{
			await addUser(name, senha);
			props.updateSession({user: name});
			props.autenticar(true);
		}
		setEnabledButton(true);
	}

	function handleInputNome(event){
		const novoNome = event.target.value;
		if(novoNome.length <= 20){
			setName(novoNome);
		}
	}

	function handleInputSenha(event){
		const novaSenha = event.target.value;
		if(novaSenha.length <= 20){
			setSenha(novaSenha);
		}
	}

	return (
		<div className="login-container">
			<form className="login-container__form">
				<div className="form__submit">
					<p className="form__label">Nome de Usuário</p>
					<input required className="form__input" value={name} onChange={handleInputNome} type="text"  placeholder="Nome de Usuario"/>
				</div>
				<div className="form__submit">
					<p className="form__label">Nova senha</p>
					<input required className="form__input"  value={senha} onChange={handleInputSenha} type="password" placeholder="Senha"/>
				</div>
				<div className="form__submit">
					<button disabled={!enabledButton} onClick={criarConta} className="form__button">Criar Conta</button>
				</div>
			</form>
			<p className="form__submit__p">Já possui uma conta? <a className="form__submit__a" onClick={props.changeToLogin}>clique aqui para fazer login</a></p>
		</div>
	);
}