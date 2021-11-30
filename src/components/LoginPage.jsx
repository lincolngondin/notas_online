import React, {useState} from 'react';
import {readUser} from '../db/crud.js';

const LoginPage = (props)=>{

	const [nome, setNome] = useState('');
	const [senha, setSenha] = useState('');
	const [canClickLogin, setCanClickLogin] = useState(true);

	const LoginApp = async (event)=>{
		setCanClickLogin(false);
		event.preventDefault();
		const result = await readUser(nome, senha);
		if(result){
			props.updateSession({user: nome})
			props.autenticar(true);
		}
		else{
			alert('Usuario ou senha incorretos!');
		}
		setCanClickLogin(true);
	}
	function handleInputNome(event){
		const novoNome = event.target.value;
		if(novoNome.length <= 20){
			setNome(novoNome);
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
					<input required className="form__input" onChange={handleInputNome} type="text"  value={nome} name="username" placeholder="Nome de Usuario"/>
				</div>
				<div className="form__submit">
					<p className="form__label">Senha</p>
					<input required className="form__input" onChange={handleInputSenha} value={senha} type="password" name="password" placeholder="Senha"/>
				</div>
				<div className="form__submit">
					<button disabled={!canClickLogin} onClick={LoginApp} className="form__button">Login</button>
				</div>
			</form>
			<p className="form__submit__p">Ainda não criou uma conta? <a className="form__submit__a" onClick={props.changeToSign}>clique aqui para criar</a></p>
		</div>
	);
}

export default LoginPage;