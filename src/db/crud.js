import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs, addDoc, query, where} from 'firebase/firestore';
import {keys} from "./keys";

//inicializa o app
const firebaseApp = initializeApp(keys);

//instancia do banco de dados
const db = getFirestore();

//funcao para adicionar usuarios
const addUser = async (userName, pass_word)=>{
	try{
		await addDoc(collection(db, 'users'),{
			nome: userName,
			password: pass_word,
			createdAt: Date.now()
		});
	}
	catch(e){
		console.error(e);
	}
}

//funcao para criar as anotacoes
const addNote = async(noteName, content, user) => {
	try{
		await addDoc(collection(db, 'notas'),{
			criador: user,
			nomeDaNota: noteName,
			conteudo: content,
			createdAt: Date.now()
		});
	}
	catch(e){
		console.error(e);
	}
}

//funcao para ler usuario
const readUser = async (user, pass_word) =>{
	const userQuery = query(
		collection(db, 'users'),
		where('nome', '==', user),
		where('password', '==', pass_word)
	);
	const snap = await getDocs(userQuery);
	const data = snap.docs;
	if(data.length != 0){
		return true;
	}
	return false;
}

//ler todas as notas de um usuario
const readNotes = async (user) => {
	const queryNote = query(
		collection(db, 'notas'),
		where('criador', '==', user)
	);

	const snapShot = await getDocs(queryNote);
	const notas = snapShot.docs;
	return notas;
}

//procura se usuario já existe
const checkUser = async (user) => {
	const userQuery = query(
		collection(db, 'users'),
		where('nome', '==', user) 
	);
	const snap = await getDocs(userQuery);
	const data = snap.docs;
	if(data.length != 0){
		return true;
	}
	return false;
}

function log(){
	console.log("tudo ok");
}

export {addUser, checkUser, readUser, readNotes, log, addNote};