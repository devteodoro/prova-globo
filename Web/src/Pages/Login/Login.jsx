import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import "./Login.css";
import AuthService from '../../Services/AuthService';
import { useNavigate } from 'react-router';

const authService = new AuthService()

const Login = ({onLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(username == "")
          return alert("O nome de usuário é obrigatório!");

        if(password == "")
          return alert("A senha é obrigatória!");

        try {
          const response = await authService.login(username, password);

          if (response) 
            navigate('/home');
          else 
            alert('Ocorreu um erro, tente novamente!');
        }
        catch (err) {
          alert('Ocorreu um erro no login' + err);
        }
    } 

  return (
    <div className='layout-login'>
      <div className='container'>
        <form onSubmit={handleSubmit}>
            <h1>Acesse o sistema</h1>
            <div className='input-field'>
                
                <input 
                    type="text" 
                    placeholder='Nome de usuário'
                    onChange={(e) => setUsername(e.target.value)} />
                    <FaUser className='icon' />
            </div>
            <div className='input-field'>
                
                <input 
                    type="password" 
                    placeholder='Senha'
                    onChange={(e) => setPassword(e.target.value)}/>
                    <FaLock className='icon' />
            </div>
            <button>Entrar</button>
        </form>
      </div>
    </div>
  )
}

export default Login
