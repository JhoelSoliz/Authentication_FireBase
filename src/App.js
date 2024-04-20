import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA_FI9PRO3iWLL9Dzaw22BdX_v1d1FF2T8",
  authDomain: "pwiii-c707e.firebaseapp.com",
  projectId: "pwiii-c707e",
  storageBucket: "pwiii-c707e.appspot.com",
  messagingSenderId: "70800164576",
  appId: "1:70800164576:web:68fd05dc9995e485607285",
  measurementId: "G-YV9EDVKNB5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [registerMode, setRegisterMode] = useState(false);

  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      setError(null);
      setUser(userCredential.user);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('As senhas não correspondem');
      return;
    }

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      setError(null);
      setUser(userCredential.user);
      // Registro bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      setError(null);
      setUser(userCredential.user);
      // Login bem-sucedido, você pode redirecionar ou fazer outras ações aqui
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleMode = () => {
    setRegisterMode(!registerMode);
    clearFields(); // Limpar campos ao trocar entre modo de login e registro
  };

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <style>
        {`
          /* Seu CSS aqui */
          * {
            font-family: 'Century Gothic', sans-serif;
          }
          body {
            background-image: url('https://wallpapercave.com/wp/wp9276183.jpg');
            background-size: cover; 
            background-position: center;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .login-container {
            width: 300px;
            background-color: rgba(105, 105, 105, 0.135);
            backdrop-filter: blur(10px);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }
          input[type="email"],
          input[type="password"] {
            width: 90%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          button {
            align-items: center;
            width: 97%;
            padding: 10px;
            background-color: #606060a4;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease; 
          }
          button:hover {
            background-color: #4d70bda4;
          }
          p {
            margin: 5px 0;
            text-align: center;
            color: white;
          }
          .logout-button {
            background-color: #606060a4;
            margin-top: 20px;
          }
          .toggle-button {
            background-color: #606060a4;
            margin-top: 20px;
          }
        `}
      </style>
      {user ? (
        <div className="login-container">
          <h1 style={{ textAlign: 'center', color: 'white' }}>Bem-vindo!</h1>
          <p style={{ textAlign: 'center', color: 'white' }}>Você está logado como:</p>
          <p style={{ textAlign: 'center', color: 'white' }}>{user.email}</p>
          <button className="logout-button" onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <div className="login-container">
          <h1 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>{registerMode ? 'Registrar' : 'Faça o login'}</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {registerMode && (
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          {registerMode ? (
            <button onClick={handleRegister}>Registrar</button>
          ) : (
            <div>
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleGoogleLogin}>Login com Google</button>
            </div>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="toggle-button" onClick={toggleMode}>
            {registerMode ? 'Já tem uma conta? Faça login' : 'Não tem uma conta? Registre-se'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
