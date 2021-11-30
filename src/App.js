import './App.css';
import React, {useState} from 'react';

import LoginPage from "./components/LoginPage";
import SignPage from "./components/SignPage";
import NoteMakePage from "./components/NoteMakePage";
import NoteViewer from "./components/NoteViewer";


function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [criarConta, setCriarConta] = useState(true);
  const [verNotas, setVerNotas] = useState(false);
  const [session, setSession] = useState({
    user: ''
  });
  function autenticar(ans){
    console.log("Autenticando...");
    setAutenticado(ans);
    console.log("Autenticado!");
  }
  console.log(session);
  if(autenticado){
    if(verNotas){
      return (
        <NoteViewer session={session} changeToEditor={()=>{setVerNotas(false)}}/>
      );
    }

    else{
      return (
        <NoteMakePage changeToViewer={()=>{setVerNotas(true);}} autenticar={autenticar} session={session} updateSession={setSession}/>
      );
    }

  } 
  else{
    if(criarConta)
      return <SignPage autenticar={autenticar} changeToLogin={()=>{setCriarConta(false)}}  updateSession={setSession}/>
    else
      return <LoginPage autenticar={autenticar} changeToSign={()=>{setCriarConta(true);}} updateSession={setSession}/>
  }
}

export default App
