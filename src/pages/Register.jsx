// src/pages/Register.js
import React, { useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log('Inscription soumise');
    // Ajouter la logique d'inscription ici
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">S'inscrire</h2>
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
          <InputField
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
          />
          <Button text="S'inscrire" type="submit" />
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte ?{' '}
            <a href="/login" className="text-blue-500">Se connecter</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
