// src/pages/Login.js
import React, { useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    // Ajouter la logique d'authentification ici
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Se Connecter</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <InputField
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <Button text="Se Connecter" type="submit" />
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Vous n'avez pas de compte ?{' '}
            <a href="/register" className="text-blue-500">S'inscrire</a>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Login;
